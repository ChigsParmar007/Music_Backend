const mongoose = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const cloudinary = require('cloudinary').v2

process.on('uncaughtException', (err) => {
	console.log('Uncaught Exception! Shutting down...')
	console.log(err)
	console.log(err.name, err.message)
	process.exit(1)
})

// Configuration
cloudinary.config({
	cloud_name: 'dwwcmiexl',
	api_key: '368683574724734',
	api_secret: 'M5Rn8pXXcZKc3RkGXv1BQVCKphQ',
})

const DB = process.env.MOGODB_CLUSTER.replace(
	'<password>',
	process.env.MOGODB_CLUSTER_PASSWORD
)
mongoose.set('strictQuery', true)
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB Cluster Connected')
	})
	.catch((error) => console.log(error))

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

process.on('unhandledRejection', (err) => {
	console.log('Unhandled Rejection! Shutting down...')
	console.log(err.name, err.message)
	app.close(() => {
		process.exit(1)
	})
})
