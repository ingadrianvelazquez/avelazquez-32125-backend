import mongoose from 'mongoose'
const userCollection = 'users'

export const UserSchema = new mongoose.Schema(
    {
        username: { type: String, require: true, maxLength: 128, trim: true },
        password: { type: String, maxLength: 64, trim: true },
        fullname: { type: String, maxLength: 128, trim: true },
        address: { type: String, maxLength: 128, trim: true },
        age: { type: String, maxLength: 3, trim: true },
        phone: { type: String, maxLength: 32, trim: true },
        avatar: { type: String, maxLength: 1024, trim: true },
    },
    { timestamps: true }
)

export const userModel = mongoose.model(userCollection, UserSchema)
