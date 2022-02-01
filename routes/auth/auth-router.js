const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User_model = require('../../models/user-model')
const router = Router()

//--------Controllers
const Auth_contoller = require('../../controllers/auth-controller');
//--------End controllers


// TODO: Register page
router.get("/registration", Auth_contoller.registration_page)

// TODO: Create user
router.post('/registration', Auth_contoller.registration_page_post)

// TODO: Login page
router.get("/login", Auth_contoller.login_page_render)

// TODO: Log in user
router.post('/login', Auth_contoller.login_page_post)

// TODO: Log out and delete session
router.get('/logout', Auth_contoller.logout)

module.exports = router