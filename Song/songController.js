const catchAsync = require('../Utils/catchAsync')
const Song = require('./songModel')
const { predictSong, createHistory } = require('../History/historyController')
const { cloudinary } = require('../Utils/cloudinary')

const uploadToCloudinaryImage = async (path) => {
	return await cloudinary.uploader
		.upload(path, {
			folder: 'images',
		})
		.then((result) => {
			return result.url
		})
		.catch((error) => {
			console.log('error1', error)
			return 'Fail'
		})
}

const uploadToCloudinarySong = async (path, fName) => {
	return await cloudinary.uploader
		.upload(path, {
			resource_type: 'raw',
			public_id: `AudioUploads/${fName}`,
		})
		.then((result) => {
			return result.url
		})
		.catch((error) => {
			console.log('error2', error)
			return 'Fail'
		})
}

const addSong = catchAsync(async (req, res) => {
	const imageSuccess = await uploadToCloudinaryImage(req.files[0].path)

	const fName = req.files[1].originalname.split('.')[0]
	const songSuccess = await uploadToCloudinarySong(req.files[1].path, fName)

	if (imageSuccess === 'Fail' || songSuccess === 'Fail') {
		return res.status(400).json({
			message: 'Something went wrong in file upload.',
		})
	}

	const song = await Song.create({
		title: req.body.title,
		songUrl: songSuccess,
		imageUrl: imageSuccess,
		singer: req.body.singer,
		type: req.body.type,
	})
	return res.status(201).json(song)
})

const createHistories = catchAsync(async (req, res) => {
	await createHistory(req.user._id, req.body.songType)

	return res.status(201).json({
		message: 'History created successfully',
	})
})

const getSong = catchAsync(async (req, res) => {
	const nextSong = await predictSong(req.user._id)

	const song = await Song.find({ type: nextSong })
	const number = song.length === 1 ? 0 : song.length

	const randomNumber = Math.floor(Math.random() * number)

	return res.status(200).json(song[randomNumber])
})

const searchSong = catchAsync(async (req, res) => {
	const key = req.params.key
	const songs = await Song.find({
		$or: [
			{ title: { $regex: new RegExp('^' + key.toLowerCase(), 'i') } },
			{ type: { $regex: new RegExp('^' + key.toLowerCase(), 'i') } },
		],
	})

	return res.status(200).json(songs)
})

const getSongById = catchAsync(async (req, res) => {
	const song = await Song.findById(req.params.id)

	if (!song) return res.status(404).json({ message: 'Song not found' })

	return res.status(200).json(song)
})

const getRecentSongs = catchAsync(async (req, res) => {
	const songs = await Song.find().sort({ createdAt: -1 }).limit(10)

	return res.status(200).json(songs)
})

module.exports = {
	addSong,
	getSong,
	createHistories,
	searchSong,
	getSongById,
	getRecentSongs,
}
