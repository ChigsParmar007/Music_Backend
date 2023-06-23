const AppError = require('../Utils/appError')
const {
	emailValidate,
	passwordLengthValidate,
	passwordAndPasswordConfirmValidate,
	phoneNumberValidate,
	usernameValidate,
} = require('../Common/Functions/validateInput')

const signupMiddleware = (req, res, next) => {
	const missingValue = []
	if (!req.body.name) missingValue.push('Enter Name')
	if (!req.body.userName) missingValue.push('Enter userName.')
	if (!req.body.gender) missingValue.push('Enter gender.')
	if (!req.body.dob) missingValue.push('Enter Date Of Birth.')
	if (!req.body.email) missingValue.push('Enter email.')
	if (!req.body.phone) missingValue.push('Enter phone.')
	if (!req.body.password) missingValue.push('Enter password.')
	if (!req.body.passwordConfirm) missingValue.push('Password Confirm')

	if (missingValue.length > 0) {
		return next(
			new AppError(`Requuired missing values : ${missingValue.join(', ')}`, 400)
		)
	}

	if (!usernameValidate(req.body.userName)) {
		return next(
			new AppError(
				`UserName is not valid.
                Only contains alphanumeric characters, underscore and dot.
                Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
                Underscore and dot can't be next to each other (e.g user_.name).
                Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
                Number of characters must be between 8 to 20.`,
				400
			)
		)
	}

	if (!emailValidate(req.body.email)) {
		return next(new AppError('Invalid email address.', 400))
	}

	if (!phoneNumberValidate(req.body.phone)) {
		return next(new AppError('Invalid phone number.', 400))
	}

	if (!passwordLengthValidate(req.body.password)) {
		return next(
			new AppError('Password should be at least 8 to 20 characters.', 400)
		)
	}

	if (
		!passwordAndPasswordConfirmValidate(
			req.body.password,
			req.body.passwordConfirm
		)
	) {
		return next(
			new AppError('Password and Password Confirm are not match.', 400)
		)
	}

	next()
}

const signinMiddleware = async (req, res, next) => {
	const missingValues = []

	if (!req.body.userName) missingValues.push('Username')
	if (!req.body.password) missingValues.push('Password')

	if (missingValues.length > 0) {
		return next(
			new AppError(`requird missing values : ${missingValues.join(', ')}`, 400)
		)
	}

	next()
}

module.exports = {
	signupMiddleware,
	signinMiddleware,
}
