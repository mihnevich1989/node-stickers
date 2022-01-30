module.exports = function (req, res, next) {
    if (!req.session.isAuthenticated) {
        req.flash("message", "You are not authorized!")
        return res.redirect('/auth/login')
    }
    next()
}