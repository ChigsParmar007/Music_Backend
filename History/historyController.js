const History = require('./historyModel')

const createHistory = async (userId, songType) => {
	await History.create({
		userId,
		songType,
	})

	deleteHistory(userId)
}

const deleteHistory = async (userId) => {
	const history = await History.find({ userId }).sort({ createdAt: 1 })

	if (history.length <= 20) {
		return
	}

	await History.findByIdAndDelete(history[0]._id)
}

const predictSong = async (userId) => {
	const history = await History.find({ userId })

	const number = Math.floor(Math.random() * 2) + 1

	if (history.length === 0) {
		return number === 1 ? 'Romantic' : number === 2 ? 'Party' : 'Sad'
	}

	let Romantic = 0
	let Party = 0
	let Sad = 0

	history.map((item) => {
		if (item.songType === 'Romantic') {
			Romantic++
		} else if (item.songType === 'Party') {
			Party++
		} else if (item.songType === 'Sad') {
			Sad++
		}
	})

	const randomNumber = Math.floor(Math.random() * 2) + 1

	if (Romantic > Party && Romantic > Sad) {
		return 'Romantic'
	} else if (Party > Sad) {
		return 'Party'
	} else if (Romantic === Party || Romantic === Sad) {
		if (Romantic === Party) {
			return randomNumber === 1 ? 'Romantic' : 'Party'
		} else {
			return randomNumber === 1 ? 'Romantic' : 'Sad'
		}
	} else if (Party === Sad) {
		return randomNumber === 1 ? 'Party' : 'Sad'
	} else {
		return 'Sad'
	}
}

module.exports = { createHistory, deleteHistory, predictSong }
