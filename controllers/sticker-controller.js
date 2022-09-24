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

  async my_sticker_page_edited(req, res) {
    try {
      const result_my_sticker_page_edited = await My_sticker_service.my_sticker_page_edited(req.query, req.session);
      if (!result_my_sticker_page_edited.result) {
        req.flash("message", result_my_sticker_page_edited.message);
        return res.status(404).json({ result: false, message: " can't open sticker" });
      }
      return res.render("mystickers/edited-sticker", result_my_sticker_page_edited);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async my_stickers_page_post(req, res) {
    try {
      const result_my_stickers_page_post = await My_sticker_service.my_stickers_page_post(req.body, req.session);
      if (!result_my_stickers_page_post.result) {
        req.flash("message", result_my_stickers_page_post.message);
        return res.status(409).json({ result: result_my_stickers_page_post.result, message: result_my_stickers_page_post.message });
      }
      req.flash("message", result_my_stickers_page_post.message);
      res.redirect(`/my-stickers/edit?id=${result_my_stickers_page_post.stickerId}`);
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
      res.redirect('/my-stickers');
      // return res.status(201).json({ result: result_my_sticker_page_delete.result, message: result_my_sticker_page_delete.message })
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }


}

module.exports = new My_sticker_controller();
