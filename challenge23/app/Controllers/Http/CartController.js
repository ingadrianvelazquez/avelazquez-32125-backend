"use strict";

const Cart = use("App/Models/Cart");

class CartController {
  async get({ params }) {
    if (params.id) {
      const cart = await Cart.find(params.id);
      if (cart) return cart.toJSON();
      else return "ID not found";
    } else {
      return (await Cart.all()).toJSON();
    }
  }

  async insert({ request, response }) {
    const cart = new Cart();
    const { user, products } = request._body;
    cart.user = user;
    cart.products = products;
    return (await cart.save()) ? "Insert successfull" : "Error on Insert";
  }

  async update({ params, request }) {
    const cart = await Cart.find(params.id);
    if (cart) {
      const info = request.only(["id_prod"]);
      const prods = JSON.parse(cart.products);
      prods.push(info.id_prod);
      cart.products = JSON.stringify(prods);
      return (await cart.save()) ? "Update successfull" : "Error on Update";
    }
    return "ID not found";
  }

  async delete({ params }) {
    let ret = 0;
    if (params.id) {
      const cart = await Cart.find(params.id);
      if (cart) ret = await cart.delete();
      else return "ID not found";
    } else {
      ret = await Cart.query().delete();
    }
    return ret ? "Delete successfull" : "Error on Delete";
  }

  async deleteProduct({ params }) {
    let ret = 0;
    if (params.id) {
      const cart = await Cart.find(params.id);
      if (cart) {
        const prods = JSON.parse(cart.products);
        const idProd = params.id_prod;
        if (prods.find((elem) => elem === idProd || elem.id === idProd)) {
          cart.products = JSON.stringify(
            prods.filter((elem) => elem !== idProd && elem.id !== idProd)
          );
          ret = await cart.save();
        } else return "ID Product not found on Cart";
      }
    } else return "ID not found";
    return ret ? "Delete successfull" : "Error on Delete";
  }
}

module.exports = CartController;
