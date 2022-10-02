const { Schema, model } = require('mongoose')

const stickerSchema = new Schema({
	header: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 15
	},
	templates: [{
		type: Schema.Types.ObjectId,
		ref: 'Template'
	}],
	data: {},
	notes: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	}
});

//! add new date before update
stickerSchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})

module.exports = model("Sticker", stickerSchema)
