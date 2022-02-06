const { Schema, model } = require('mongoose')

const stickerSchema = new Schema({
	group: {
		type: Schema.Types.ObjectId,
		ref: 'Group'
	},
	notes: [String],
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

//! add new date before update
stickerSchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})

module.exports = model("Sticker", stickerSchema)
