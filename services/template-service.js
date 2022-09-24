const Template_model = require('../models/template-model');


class Template_service {

  async template_page(session) {
    const templates = await Template_model.find({ author: session.user._id });
    return {
      layout: "main",
      title: "Templates page",
      templates,
      isTemplates: true,
    };
  }

  async template_edited_page({ id }, session) {
    let template = await Template_model.findOne({ _id: id, author: session.user._id });
    if (!template) return { result: false, message: "Template doesn't exist, or you don't have access!" };

    return {
      result: true,
      layout: "main",
      title: "Editing template page",
      templateId: template._id,
      category: template.category,
      data: [...template.list_data],
      isTemplate: true
    };
  }

  async template_page_post({ category, list_data }, session) {
    if (!category || list_data.lenght == 0) return { result: false, message: "Before save you must add category and list data!" };
    const isExistOwnCategory = await Template_model.findOne({ category, author: session.user._id });
    if (isExistOwnCategory) return { result: false, message: `Category ${category} in your templates alredy exist!` };
    const list = new Template_model({
      category,
      list_data,
      author: session.user._id
    });
    await list.save();
    return { result: true, message: `Category ${category} added!`, listId: list._id };
  }

  async template_page_put({ category, list_data }, { listId }, session) {
    //it's pattern to save documend and usefull pre hook middleware for updateAt timestamp, see more https://mongoosejs.com/docs/middleware.html#notes
    const isExist = await Template_model.findOne({ _id: listId, author: session.user._id });
    if (!isExist) return { result: false, message: "Template doesn't exist!" };
    isExist.category = category;
    isExist.list_data = [...list_data];
    await isExist.save();
    return { result: true, message: `Category ${category} edited!`, templateId: isExist._id };
  }

  async template_page_delete({ listId }, session) {
    const isDeleted = await Template_model.deleteOne({ _id: listId, author: session.user._id });
    if (isDeleted.deletedCount === 0) return { result: false, message: "Template doesn't exist or you don't have access to delete!" };
    return { result: true, message: "Template deleted!" };
  }
}

module.exports = new Template_service();
