const { Router } = require('express');
const My_sticker_controller = require("../../controllers/sticker-controller")
const router = Router();

// TODO: stickers page render
router.get("/", My_sticker_controller.my_sticker_page)

// TODO: create page render
router.get('/create', My_sticker_controller.new_sticker_page_render)

// TODO: create sticker
router.post('/create', My_sticker_controller.my_stickers_page_post)

// TODO: sticker edit page render
router.get('/edit', My_sticker_controller.my_sticker_page_edit)

// TODO: edit sticker
router.put('/edit', My_sticker_controller.my_stickers_page_put)

// TODO: delete sticker
router.delete('/delete', My_sticker_controller.my_sticker_page_delete)

module.exports = router;
