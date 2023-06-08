const Sticker_model = require('../models/sticker-model');
const moment = require('moment');

class My_sticker_service {
  async my_sticker_page(session) {
    const all_stickers = await Sticker_model.find({ author: session.user._id }, { _id: 1, createdAt: 1, header: 1, data: 1 }).sort({ createdAt: -1 });
    const stickers = all_stickers.map(el => { return { header: el.header, id: el._id.toString(), date: moment(el.createdAt).format("LL"), data: el.data }; });
    return {
      result: true,
      layout: "main",
      title: "My Stickers page",
      stickers,
      isHome: true
    };
  }

  async my_sticker_page_edit_render({ id }, session) {
    const sticker = await Sticker_model.findOne({ _id: id, author: session.user._id });
    if (!sticker) return { result: false, message: "Sticker doesn't exist or you don't have access!" };
    return {
      result: true,
      layout: "main",
      title: "Editing sticker page",
      stickerId: sticker._id,
      header: sticker.header,
      data: sticker.data,
      date: moment(sticker.createdAt).format('LL'),
      isSticker: true
    };
  }

  async new_sticker_page_render() {
    return {
      result: true,
      layout: "main",
      title: "Create new sticker page",
      isNewSticker: true
    };
  }

  async my_stickers_page_create({ header, data, notes }, session) {
    if (!header) return { result: false, message: "Header can't be empty" };
    const new_sticker = new Sticker_model({
      header,
      data,
      notes,
      author: session.user._id
    });
    await new_sticker.save();
    return { result: true, message: `Sticker ${header} created!`, stickerId: new_sticker._id };
  }

  async my_sticker_page_editing({ header, data, notes }, { id }, session) {
    if (!header) return { result: false, message: "Header can't be empty" };
    const edited_sticker = await Sticker_model.findOne({ _id: id, author: session.user._id });
    edited_sticker.header = header;
    edited_sticker.data = data;
    edited_sticker.notes = notes;
    await edited_sticker.save();
    return { result: true, message: `Sticker ${header} edited!`, stickerId: edited_sticker._id };
  }

  async my_sticker_page_delete({ id }, session) {
    const isDeleted = await Sticker_model.deleteOne({ _id: id, author: session.user._id });
    if (isDeleted.deletedCount === 0) return { result: false, message: "Sticker doesn't exist or you don't have access to delete!" };
    return { result: true, message: "Sticker deleted!" };
  }
}

module.exports = new My_sticker_service();
