const My_sticker_service = require('../services/sticker-service');

class My_sticker_controller {
  async my_sticker_page(req, res) {
    try {
      const result_my_sticker_page = await My_sticker_service.my_sticker_page(req.session);
      return res.render("mystickers/my-stickers", result_my_sticker_page);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async my_sticker_page_edit_render(req, res) {
    try {
      const result_my_sticker_page_edit_render = await My_sticker_service.my_sticker_page_edit_render(req.query, req.session);
      if (!result_my_sticker_page_edit_render.result) {
        // req.flash("message", result_my_sticker_page_edit_rendered.message);
        return res.status(404).json({ result: false, message: " can't open sticker" });
      }
      return res.status(200).render("mystickers/edit-sticker", result_my_sticker_page_edit_render);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async new_sticker_page_render(req, res) {
    try {
      const result_new_sticker_page_render = await My_sticker_service.new_sticker_page_render(req.session);
      return res.status(200).render("mystickers/new-sticker", result_new_sticker_page_render);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async my_stickers_page_create(req, res) {
    try {
      console.log(req.body);
      const result_my_stickers_page_create = await My_sticker_service.my_stickers_page_create(req.body, req.session);
      if (!result_my_stickers_page_create.result) {
        req.flash("message", result_my_stickers_page_create.message);
        return res.status(409).json({ result: result_my_stickers_page_create.result, message: result_my_stickers_page_create.message });
      }

      req.flash("message", result_my_stickers_page_create.message);
      // res.redirect(`/my-stickers/edit?id=${result_my_stickers_page_create.stickerId}`);
      res.status(200).json({ result: result_my_stickers_page_create.result, message: result_my_stickers_page_create.message, path: '/my-stickers' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async my_sticker_page_editing(req, res) {
    try {
      const result_my_sticker_page_editing = await My_sticker_service.my_sticker_page_editing(req.body, req.query, req.session);
      if (!result_my_sticker_page_editing.result) {
        req.flash("message", result_my_sticker_page_editing.message);
        return res.status(409).json({ result: result_my_sticker_page_editing.result, message: result_my_sticker_page_editing.message });
      }
      req.flash("message", result_my_sticker_page_editing.message);
      return res.redirect(`/my-stickers/edit?id=${result_my_sticker_page_editing.stickerId}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async my_sticker_page_delete(req, res) {
    try {
      const result_my_sticker_page_delete = await My_sticker_service.my_sticker_page_delete(req.query, req.session);
      if (!result_my_sticker_page_delete.result) {
        req.flash("message", result_my_sticker_page_delete.message);
        return res.status(409).json({ result: result_my_sticker_page_delete.result, message: result_my_sticker_page_delete.message });
      }
      req.flash("message", result_my_sticker_page_delete.message);
      // res.redirect('/my-stickers');
      return res.status(201).json({ result: result_my_sticker_page_delete.result, message: result_my_sticker_page_delete.message });
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }


}

module.exports = new My_sticker_controller();
