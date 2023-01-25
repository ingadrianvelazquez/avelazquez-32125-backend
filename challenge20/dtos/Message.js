import mongoose from 'mongoose'
const authorCollection = 'author'
const messageCollection = 'messages'

export const AuthorSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, maxLength: 128, trim: true },
        name: { type: String, require: true, maxLength: 128, trim: true },
        surname: { type: String, maxLength: 128, trim: true },
        age: { type: String, maxLength: 3, trim: true },
        alias: { type: String, require: true, maxLength: 64, trim: true },
        avatar: { type: String, maxLength: 1024, trim: true },
    }
)

export const authorModel = mongoose.model(authorCollection, AuthorSchema)

export const MessageSchema = new mongoose.Schema(
    {
        author: AuthorSchema,
        msg: { type: String, require: true, maxLength: 512, trim: true },
    },
    { timestamps: true }
)

export const messageModel = mongoose.model(messageCollection, MessageSchema)

export default class Message {
    constructor(email, name, surname, age, alias, avatar, msg) {
        this.author = {
            email: email,
            name: name,
            surname: surname,
            age: age,
            alias: alias,
            avatar: avatar
        }
        this.msg = msg || ''
        this.date = new Date(Date.now()).toLocaleString()
    }
}
