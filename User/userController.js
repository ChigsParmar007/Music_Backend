const jwt = require('jsonwebtoken')
const User = require('./userModel')
const catchAsync = require('../Utils/catchAsync')

const tokenGenerate = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})
}

const signup = catchAsync(async (req, res) => {
	await User.create(req.body)

	return res.status(201).json({
		message: 'User Register Successfully.',
	})
})

const signin = catchAsync(async (req, res, next) => {
	const { userName, password } = req.body

	const user = await User.findOne({ userName }).select('+password')
	if (
		user === null ||
		!(await user.correctPassword(password, user.password))
	) {
		return res.status(401).json({
			message:
				'Username or Password incorrect. Check your Login credentials.',
		})
	}
	user.password = undefined

	const token = tokenGenerate(user._id)

	res.status(200).json({
		message: 'Login Successfully',
		token,
		user,
	})
})

module.exports = {
	signin,
	signup,
}
