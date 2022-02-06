const { Router } = require('express');
const List_controller = require('../../controllers/list-controller')
const router = Router();

// TODO: list page render
router.get("/", List_controller.list_page);

// TODO: create list
router.post("/", List_controller.list_page_post)

// TODO: edit list
router.put("/", List_controller.list_page_put)

// TODO: delete list
router.delete("/", List_controller.list_page_delete)

module.exports = router;