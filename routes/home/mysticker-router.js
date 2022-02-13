const { Router } = require('express');
const My_sticker_controller = require("../../controllers/sticker-controller")
const router = Router();

// TODO: stickers page render
router.get("/", My_sticker_controller.my_sticker_page)

// TODO: sticker edit page 
router.get('/edit', My_sticker_controller.my_sticker_page_edited)

// TODO: create sticker
router.post('/', My_sticker_controller.my_stickers_page_post)

// TODO: edit sticker
router.put('/', My_sticker_controller.my_stickers_page_put)

module.exports = router;