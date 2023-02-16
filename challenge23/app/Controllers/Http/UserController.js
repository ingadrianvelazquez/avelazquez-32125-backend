"use strict";

const User = use("App/Models/User");

class UserController {
  async get({ params }) {
    if (params.id) {
      const user = await User.find(params.id);
      if (user) return user.toJSON();
      else return "ID not found";
    } else {
      return (await User.all()).toJSON();
    }
  }

  async insert({ request, response }) {
    const user = new User();
    const { username, password, fullname, address, age, phone, avatar } =
      request._body;
    user.username = username;
    user.password = password;
    user.fullname = fullname;
    user.address = address;
    user.age = age;
    user.phone = phone;
    user.avatar = avatar;
    return (await user.save()) ? "Insert successfull" : "Error on Insert";
  }

  async update({ params, request }) {
    const user = await User.find(params.id);
    if (user) {
      const info = request.only(["password"]);
      user.password = info.password;
      return (await user.save()) ? "Update successfull" : "Error on Update";
    }
    return "ID not found";
  }

  async delete({ params }) {
    let ret = 0;
    if (params.id) {
      const user = await User.find(params.id);
      if (user) ret = await user.delete();
      else return "ID not found";
    } else {
      ret = await User.query().delete();
    }
    return ret ? "Delete successfull" : "Error on Delete";
  }
}

module.exports = UserController;
