const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

const userRoute = require('./User/userRoute')
const songRoute = require('./Song/songRoute')
const globleErrorHandler = require('./Utils/errorHandler')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/user', userRoute)
app.use('/api/songs', songRoute)

app.use(globleErrorHandler)

module.exports = app
