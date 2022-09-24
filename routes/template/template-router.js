const { Router } = require('express');
const Template_controller = require('../../controllers/template-controller')
const router = Router();

// TODO: template page render
router.get("/", Template_controller.template_page_render);

// TODO: edited/created page render
router.get('/edit', Template_controller.template_edited_page)

// TODO: create template
router.post("/", Template_controller.template_page_post)

// TODO: edit template
router.put("/", Template_controller.template_page_put)

// TODO: delete template
router.delete("/", Template_controller.template_page_delete)

module.exports = router;
