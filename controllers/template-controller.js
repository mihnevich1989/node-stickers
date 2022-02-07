const Template_service = require('../services/template-service')

class Template_controller {

	async template_page(req, res) {
		try {
			const result_template_page = await Template_service.template_page(req.session)
			return res.render("templates", result_template_page)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async template_page_post(req, res) {
		try {
			const result_template_page_post = await Template_service.template_page_post(req.body, req.session)
			if (!result_template_page_post.result) {
				req.flash("message", result_template_page_post.message)
				return res.status(409).json({ result: result_template_page_post.result, message: result_template_page_post.message })
			}
			req.flash("message", result_template_page_post.message)
			return res.status(201).json({ result: result_template_page_post.result, message: result_template_page_post.message, listId: result_template_page_post.listId })

		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async template_page_put(req, res) {
		try {
			const result_template_page_put = await Template_service.template_page_put(req.body, req.query, req.session)
			if (!result_template_page_put.result) {
				req.flash("message", result_template_page_put.message)
				return res.status(409).json({ result: result_template_page_put.result, message: result_template_page_put.message })
			}
			req.flash("message", result_template_page_put.message)
			return res.status(201).json({ result: result_template_page_put.result, message: result_template_page_put.message })

		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async template_page_delete(req, res) {
		try {
			const result_template_page_delete = await Template_service.template_page_delete(req.query, req.session)
			if (!result_template_page_delete.result) {
				req.flash("message", result_template_page_delete.message)
				return res.status(409).json({ result: result_template_page_delete.result, message: result_template_page_delete.message })
			}
			req.flash("message", result_template_page_delete.message)
			return res.status(201).json({ result: result_template_page_delete.result, message: result_template_page_delete.message })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

}

module.exports = new Template_controller()