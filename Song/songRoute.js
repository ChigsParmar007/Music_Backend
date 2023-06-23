const express = require('express')
const router = express.Router()
const {
	addSong,
	getSong,
	createHistories,
	searchSong,
	getSongById,
	getRecentSongs,
} = require('./songController')
const { protect } = require('../Utils/authMiddleware')
const { upload } = require('../Utils/cloudinary')

router.route('/addsong').post(upload, addSong)

router.route('/getsong').get(protect, getSong)

router.route('/createhistory').post(protect, createHistories)

router.route('/searchsong/:key?').get(searchSong)

router.route('/getsongbyid/:id').get(getSongById)

router.route('/getrecentsongs').get(getRecentSongs)

module.exports = router
