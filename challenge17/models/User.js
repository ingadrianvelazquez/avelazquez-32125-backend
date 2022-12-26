import mongoose from 'mongoose'
const userCollection = 'users'

export const UserSchema = new mongoose.Schema(
    {
        username: { type: String, require: true, maxLength: 128, trim: true },
        password: { type: String, maxLength: 64, trim: true }
    },
    { timestamps: true }
)

export const userModel = mongoose.model(userCollection, UserSchema)

export class User {
    constructor(username, password) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.username = username || ""
        this.password = password || ""
    }
}
