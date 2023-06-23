const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		userName: {
			type: String,
			required: true,
			trim: true,
		},
		gender: {
			type: String,
			enum: ['Male', 'Female'],
			required: true,
			trim: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
			trim: true,
		},
		phone: {
			type: Number,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{ timestamps: true }
)

schema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()

	this.password = await bcryptjs.hash(this.password, 12)

	next()
})

schema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcryptjs.compare(candidatePassword, userPassword)
}

schema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		)
		return JWTTimestamp < changedTimestamp
	}

	return false
}

schema.methods.createPasswordResetToken = async function () {
	const resetToken = crypto.randomBytes(32).toString('hex')

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000

	return resetToken
}

const userSchema = mongoose.model('user', schema)

module.exports = userSchema
