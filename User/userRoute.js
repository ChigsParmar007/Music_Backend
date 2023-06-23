const express = require('express')
const router = express.Router()

const { signup, signin } = require('./userController')
const { signupMiddleware, signinMiddleware } = require('./userMiddleware')

router.route('/signup').post(signupMiddleware, signup)

router.route('/signin').post(signinMiddleware, signin)

module.exports = router
