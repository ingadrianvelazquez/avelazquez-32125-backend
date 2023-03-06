import mongoose from 'mongoose'
import { ProductCartSchema } from './Product.js'

const orderCollection = 'orders'

export const OrderSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, maxLength: 32, trim: true },
        products: [ProductCartSchema]
    },
    { timestamps: true }
)

export const orderModel = mongoose.model(orderCollection, OrderSchema)
