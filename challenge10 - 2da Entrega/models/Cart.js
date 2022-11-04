const mongoose = require('mongoose')
const { ProductIDSchema } = require('./Product')

const cartCollection = 'carts'

const CartSchema = new mongoose.Schema(
    {
        products: [ProductIDSchema]
    },
    { timestamps: true }
)

const cartModel = mongoose.model(cartCollection, CartSchema)

class Cart {
    constructor(products) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.products = products || []
    }
}

module.exports = { Cart, cartModel }