const Auth_service = require('../services/auth-service');

class Auth_contoller {

	login_page_render(req, res) {
		try {
			if (req.session.user && req.url == '/' || req.session.user && req.url == '/login') {
				return res.redirect(req.session.lastPath);
			} else if (!req.session.user && req.url == '/') {
				return res.redirect('/auth/login');
			}
			const login_page_service_result = Auth_service.login_page();
			return res.render("auth/login", login_page_service_result);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async login_page_post(req, res) {
		try {
			const login_page_service_result = await Auth_service.login_page_post(req.body);
			if (!login_page_service_result.result) {
				req.flash("message", login_page_service_result.message);
				return res.status(401).json({ result: login_page_service_result.result, message: login_page_service_result.message });
			}
			req.session.user = login_page_service_result.user;
			req.session.isAuthenticated = true;
			req.session.save();
			return res.redirect('/my-stickers');
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	registration_page_render(req, res) {
		try {
			if (req.session.user && req.url == '/registration') {
				return res.redirect(req.session.lastPath);
			}
			const registration_page_service_result = Auth_service.registration_page();
			return res.render("auth/registration", registration_page_service_result);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async registration_page_post(req, res) {
		try {
			const registration_page_service_result = await Auth_service.registration_page_post(req.body);
			if (!registration_page_service_result.result) {
				req.flash("message", registration_page_service_result.message);
				return res.status(401).json({ result: registration_page_service_result.result });
			}
			req.flash("message", registration_page_service_result.message);
			return res.redirect('/auth/login');
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	logout(req, res) {
		try {
			req.session.destroy(() => {
				res.redirect('/auth/login');
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new Auth_contoller();
