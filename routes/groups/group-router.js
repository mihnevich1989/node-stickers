const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
	res.render("groups", {
		layout: "main",
		title: "Group setting page",
		isGroups: true,
	});
});

module.exports = router;