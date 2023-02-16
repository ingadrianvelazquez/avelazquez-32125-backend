"use strict";

const Product = use("App/Models/Product");

class ProductController {
  async get({ params }) {
    if (params.id) {
      const prod = await Product.find(params.id);
      if (prod) return prod.toJSON();
      else return "ID not found";
    } else {
      return (await Product.all()).toJSON();
    }
  }

  async insert({ request, response }) {
    const prod = new Product();
    const { name, desc, code, url, price, stock } = request._body;
    prod.name = name;
    prod.desc = desc;
    prod.code = code;
    prod.url = url;
    prod.price = price;
    prod.stock = stock;
    return (await prod.save()) ? "Insert successfull" : "Error on Insert";
  }

  async update({ params, request }) {
    const prod = await Product.find(params.id);
    if (prod) {
      const info = request.only(["name", "stock"]);
      prod.name = info.name;
      prod.stock = info.stock;
      return (await prod.save()) ? "Update successfull" : "Error on Update";
    }
    return "ID not found";
  }

  async delete({ params }) {
    let ret = 0;
    if (params.id) {
      const prod = await Product.find(params.id);
      if (prod) ret = await prod.delete();
      else return "ID not found";
    } else {
      ret = await Product.query().delete();
    }
    return ret ? "Delete successfull" : "Error on Delete";
  }
}

module.exports = ProductController;
