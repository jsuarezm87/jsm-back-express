const mongoose = require('mongoose')

const emailValidator = (email) => {
	const emailRex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	return emailRex.test(email)
}

const mongoIdValidator = (_id) => {
	return mongoose.Types.ObjectId.isValid(_id)
}

module.exports = {
	emailValidator,
	mongoIdValidator,
}
