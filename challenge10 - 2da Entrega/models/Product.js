const mongoose = require('mongoose')

const productCollection = 'products'

const ProductIDSchema = new mongoose.Schema(
    {
        id_prod: { type: String, require: true, maxLength: 32, trim: true }
    }
)

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, maxLength: 128, trim: true },
        desc: { type: String, maxLength: 1024, trim: true },
        code: { type: String, require: true, maxLength: 32, trim: true },
        url: { type: String, require: true, maxLength: 1024, trim: true },
        price: { type: Number, require: true, min: 0 },
        stock: { type: Number, min: 0 }
    },
    { timestamps: true }
)

const productModel = mongoose.model(productCollection, ProductSchema)

class Product {
    constructor(name, desc, code, url, price, stock) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.name = name || ""
        this.desc = desc || ""
        this.code = code || ""
        this.url = url || ""
        this.price = price || ""
        this.stock = stock || ""
    }
}

module.exports = { Product, ProductSchema, ProductIDSchema, productModel }