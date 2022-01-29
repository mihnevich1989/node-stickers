const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User_model = require('../../models/user-model')
const router = Router()



// TODO: Register page
router.get("/registration", (req, res) => {
	res.render("auth/registration", {
		layout: "empty",
		title: "Регистрация",
		isRegistration: true
	})
})

// TODO: create user
router.post('/registration', async (req, res) => {
	const { username, email, password } = req.body
	const isExist = await User_model.findOne({ $or: [{ email }, { sysnamem: username.toLowerCase() }] })

	if (isExist) {
		req.flash("message", "Username or email already exist, try another!")
		return res.status(403).json({ result: false })
	}

	const hashPassword = await bcrypt.hash(password, 10)
	const newUser = new User_model({
		email: email.toLowerCase(),
		username,
		sysname: username.toLowerCase(),
		password: hashPassword
	})
	await newUser.save()
	res.status(201).json({ result: true, message: `${username} created!` })
})

// TODO: login page
router.get("/login", (req, res) => {
	res.render("auth/login", {
		layout: "empty",
		title: "Логин",
		isLogin: true,
	})
})

// TODO: login user
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	const user = await User_model.findOne({ email: email.toLowerCase() })
	if (!user) {
		req.flash("message", "Username doesn't exist!")
		return res.status(401).json({ result: false })
	}
	const areSame = await bcrypt.compare(password, user.password)
	if (!areSame) {
		req.flash("message", "Wrong login data!")
		return res.status(401).json({ result: false })
	}
	req.session.user = user
	req.session.isAuthenticated = true
	req.session.save(err => {
		if (err) {
			throw err
		}
		res.redirect('/home')
	})

})


// TODO: logout and delete session
router.get('/logout', async (req, res) => {
	req.session.destroy(() => {
		res.redirect('/auth/login')
	})
})

module.exports = router