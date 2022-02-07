const { Schema, model } = require('mongoose')

const templateSchema = new Schema({
	category: {
		type: String,
		required: true,
		unique: true,
		minlength: 1,
		maxlength: 25
	},
	list_data: [{
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	}],
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
templateSchema.pre("save", function (next) {
	this.updatedAt = Date.now()
	next()
})

module.exports = model("Template", templateSchema)