const List_service = require('../services/list-service')

class List_controller {
	
	async list_page(req, res) {
		try {
			const result_list_page = await List_service.list_page(req.session)
			return res.render("list", result_list_page)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async list_page_post(req, res) {
		try {
			const result_list_page_post = await List_service.list_page_post(req.body, req.session)
			if (!result_list_page_post.result) {
				req.flash("message", result_list_page_post.message)
				return res.status(409).json({ result: result_list_page_post.result, message: result_list_page_post.message })
			}
			req.flash("message", result_list_page_post.message)
			return res.status(201).json({ result: result_list_page_post.result, message: result_list_page_post.message, listId: result_list_page_post.listId })

		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async list_page_put(req, res) {
		try {
			const result_list_page_put = await List_service.list_page_put(req.body, req.query, req.session)
			if (!result_list_page_put.result) {
				req.flash("message", result_list_page_put.message)
				return res.status(409).json({ result: result_list_page_put.result, message: result_list_page_put.message })
			}
			req.flash("message", result_list_page_put.message)
			return res.status(201).json({ result: result_list_page_put.result, message: result_list_page_put.message })

		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async list_page_delete(req, res) {
		try {
			const result_list_page_delete = await List_service.list_page_delete(req.query, req.session)
			if (!result_list_page_delete.result) {
				req.flash("message", result_list_page_delete.message)
				return res.status(409).json({ result: result_list_page_delete.result, message: result_list_page_delete.message })
			}
			req.flash("message", result_list_page_delete.message)
			return res.status(201).json({ result: result_list_page_delete.result, message: result_list_page_delete.message })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

}

module.exports = new List_controller()