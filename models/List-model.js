const { Schema, model } = require('mongoose')

const listSchema = new Schema({
	category: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 25
	},
	list_data: [String],
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

//! add new date after update
listSchema.pre(["updateOne", "findOneAndUpdate", "findByIdAndUpdate", "save"], function (next) {
	this.updatedAt = Date.now()
	next()
})

module.exports = model("List", listSchema)