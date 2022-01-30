const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
	group_name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 25
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User-model',
		required: true
	},
	group_data: {}
});

module.exports = model("Group", groupSchema)
