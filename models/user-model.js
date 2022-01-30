const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	username: {
		type: String,
		required: true,
	},
	sysname: {
		type: String,
		lowercase: true
	},
	admin: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	},
	resetToken: String,
	resetTokenExp: Date,
});

module.exports = mongoose.model("User", userSchema)
