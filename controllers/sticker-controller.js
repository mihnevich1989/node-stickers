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

  async my_sticker_page_edit(req, res) {
    try {
      const result_my_sticker_page_edit = await My_sticker_service.my_sticker_page_edit(req.query, req.session);
      if (!result_my_sticker_page_edit.result) {
        // req.flash("message", result_my_sticker_page_edited.message);
        return res.status(404).json({ result: false, message: " can't open sticker" });
      }
      return res.status(200).render("mystickers/edit-sticker", result_my_sticker_page_edit);
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

  async my_stickers_page_post(req, res) {
    try {
      console.log(req.body);
      const result_my_stickers_page_post = await My_sticker_service.my_stickers_page_post(req.body, req.session);
      if (!result_my_stickers_page_post.result) {
        req.flash("message", result_my_stickers_page_post.message);
        return res.status(409).json({ result: result_my_stickers_page_post.result, message: result_my_stickers_page_post.message });
      }

      req.flash("message", result_my_stickers_page_post.message);
      // res.redirect(`/my-stickers/edit?id=${result_my_stickers_page_post.stickerId}`);
      res.status(200).json({ result: result_my_stickers_page_post.result, message: result_my_stickers_page_post.message, path: '/my-stickers' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async my_stickers_page_put(req, res) {
    try {
      const result_my_stickers_page_put = await My_sticker_service.my_stickers_page_put(req.body, req.query, req.session);
      if (!result_my_stickers_page_put.result) {
        req.flash("message", result_my_stickers_page_put.message);
        return res.status(409).json({ result: result_my_stickers_page_put.result, message: result_my_stickers_page_put.message });
      }
      req.flash("message", result_my_stickers_page_put.message);
      return res.redirect(`/my-stickers/edit?id=${result_my_stickers_page_put.stickerId}`);
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
