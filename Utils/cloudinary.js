const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
	cloud_name: 'dwwcmiexl',
	api_key: '368683574724734',
	api_secret: 'M5Rn8pXXcZKc3RkGXv1BQVCKphQ',
})

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/mpeg') {
// 		cb(null, true)
// 	} else {
// 		cb(
// 			{
// 				message: 'Unsupported File Format',
// 			},
// 			false
// 		)
// 	}
// }

const upload = multer({
	storage,
	limits: {
		fieldNameSize: 200,
		fileSize: 20 * 1024 * 1024,
	},
}).array('files', 2)

module.exports = { cloudinary, storage, upload }
