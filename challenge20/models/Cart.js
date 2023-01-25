import mongoose from 'mongoose'
import { ProductCartSchema } from './Product.js'

const cartCollection = 'carts'

export const CartSchema = new mongoose.Schema(
    {
        user: { type: String, require: true, maxLength: 32, trim: true },
        products: [ProductCartSchema]
    },
    { timestamps: true }
)

export const cartModel = mongoose.model(cartCollection, CartSchema)
