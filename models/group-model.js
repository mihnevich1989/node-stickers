const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
	group_name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 25
	},
	group_data: {},
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
groupSchema.pre(["updateOne", "findOneAndUpdate","findByIdAndUpdate", "save"], function (next) {
	this.updatedAt = Date.now()
	next()
})

module.exports = model("Group", groupSchema)
