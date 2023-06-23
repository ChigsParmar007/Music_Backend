const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		songUrl: {
			type: String,
			required: true,
		},
		singer: {
			type: Array,
			required: true,
		},
		imageUrl: {
			type: String,
			default: 'default.jpg',
		},
		type: {
			type: String,
			required: true,
			enum: ['Romantic', 'Party', 'Sad'],
		},
	},
	{ timestamps: true }
)

const songSchma = mongoose.model('song', schema)

module.exports = songSchma
