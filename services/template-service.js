const Template_model = require('../models/template-model')

class Template_service {

	async template_page(session) {
		const templates = await Template_model.find({ author: session.user._id })
		return {
			layout: "main",
			title: "Templates page",
			templates,
			isGroups: true,
		}
	}

	async template_page_post({ category, list_data }, session) {
		if (!category || list_data.lenght == 0) {
			return { result: false, message: "Before save you must add category and list data!" }
		}

		const list = new Template_model({
			category,
			list_data,
			author: session.user._id
		})
		await list.save()

		return { result: true, message: `Category ${category} added!`, listId: list._id }
	}

	async template_page_put({ category, list_data }, { listId }, session) {
		//it's pattern to save documend and usefull pre hook middleware for updateAt timestamp, see more https://mongoosejs.com/docs/middleware.html#notes
		const isExist = await Template_model.findById(listId)
		if (!isExist) return { result: false, message: "List doesn't exist!" }
		isExist.category = category
		isExist.list_data = [...list_data]
		await isExist.save()
		return { result: true, message: `Category ${category} edited!` }
	}

	async template_page_delete({ listId }, session) {
		const isDeleted = await Template_model.deleteOne({ _id: listId, author: session.user._id })
		if (isDeleted.deletedCount === 0) return { result: false, message: "List doesn't exist or you don't have access to delete!" }
		return { result: true, message: "List deleted!" }
	}

}

module.exports = new Template_service()