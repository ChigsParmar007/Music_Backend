const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		songType: {
			type: String,
			required: true,
			enum: ['Romantic', 'Party', 'Sad'],
		},
	},
	{ timestamps: true }
)

const historySchma = mongoose.model('history', schema)

module.exports = historySchma
