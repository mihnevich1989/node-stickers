const bcrypt = require('bcryptjs')
const User_model = require('../models/user-model')


class Auth_service {
	login_page() {
		return {
			layout: "main",
			title: "Логин",
			isLogin: true
		}
	}
	async login_page_post({ email, password }) {
		const user = await User_model.findOne({ email: email.toLowerCase() })
		if (!user) return { result: false, message: "Username doesn't exist!" }
		const areSame = await bcrypt.compare(password, user.password)
		if (!areSame) return { result: false, message: "Wrong login data!" }
		return { result: true, user }
	}

	registration_page() {
		return {
			layout: "main",
			title: "Регистрация",
			isRegistration: true
		}
	}

	async registration_page_post({ username, email, password }) {
		const isExist = await User_model.findOne({ $or: [{ email }, { sysname: username.toLowerCase() }] })
		if (isExist) return { result: false, message: "Username or email already exist, try another!" }
		const hashPassword = await bcrypt.hash(password, 10)
		const newUser = new User_model({
			email,
			username,
			sysname: username,
			password: hashPassword
		})
		await newUser.save()
		return { result: true, message: `${username} created!` }

	}
}

module.exports = new Auth_service()