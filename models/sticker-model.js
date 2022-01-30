const { Schema, model } = require('mongoose')

const stickerSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true
	}
});

module.exports = model("Sticker", stickerSchema)
