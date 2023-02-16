"use strict";

const Message = use("App/Models/Message");

class MessageController {
  async get({ params }) {
    if (params.id) {
      const message = await Message.find(params.id);
      if (message) return message.toJSON();
      else return "ID not found";
    } else {
      return (await Message.all()).toJSON();
    }
  }

  async insert({ request, response }) {
    const message = new Message();
    const {
      author_email,
      author_name,
      author_surname,
      author_age,
      author_alias,
      author_avatar,
      msg,
      date,
    } = request._body;
    message.author_email = author_email;
    message.author_name = author_name;
    message.author_surname = author_surname;
    message.author_age = author_age;
    message.author_alias = author_alias;
    message.author_avatar = author_avatar;
    message.msg = msg;
    message.date = date;
    return (await message.save()) ? "Insert successfull" : "Error on Insert";
  }

  async update({ params, request }) {
    const message = await Message.find(params.id);
    if (message) {
      const info = request.only(["msg"]);
      message.msg = info.msg;
      return (await message.save()) ? "Update successfull" : "Error on Update";
    }
    return "ID not found";
  }

  async delete({ params }) {
    let ret = 0;
    if (params.id) {
      const message = await Message.find(params.id);
      if (message) ret = await message.delete();
      else return "ID not found";
    } else {
      ret = await Message.query().delete();
    }
    return ret ? "Delete successfull" : "Error on Delete";
  }
}

module.exports = MessageController;
