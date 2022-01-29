const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	sysname: String,
	admin: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: new Date(),
	},
	resetToken: String,
	resetTokenExp: Date,
});

module.exports =  mongoose.model("User", userSchema)
