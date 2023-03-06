import mongoose from 'mongoose'
const productCollection = 'products'

export const ProductIDSchema = new mongoose.Schema(
    {
        id_prod: { type: String, require: true, maxLength: 32, trim: true }
    }
)

export const ProductCartSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, maxLength: 128, trim: true },
        category: { type: String, require: true, maxLength: 32, trim: true },
        url: { type: String, require: true, maxLength: 1024, trim: true },
        price: { type: Number, require: true, min: 0 },
    }
)

export const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, maxLength: 128, trim: true },
        desc: { type: String, maxLength: 1024, trim: true },
        category: { type: String, require: true, maxLength: 32, trim: true },
        url: { type: String, require: true, maxLength: 1024, trim: true },
        price: { type: Number, require: true, min: 0 },
        stock: { type: Number, min: 0 }
    },
    { timestamps: true }
)

export const productModel = mongoose.model(productCollection, ProductSchema)
