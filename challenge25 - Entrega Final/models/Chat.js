import mongoose from 'mongoose'

const chatCollection = 'chat'

export const ChatSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, maxLength: 32, trim: true },
        tipo: { type: String, require: true, maxLength: 8, trim: true },
        msg: { type: String, require: true, maxLength: 2048, trim: true },
    },
    { timestamps: true }
)

export const chatModel = mongoose.model(chatCollection, ChatSchema)
