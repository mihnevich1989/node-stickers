const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
	res.render("my-stickers", {
		layout: "main",
		title: "My Stickers page",
		isHome: true,
	});
});

module.exports = router;