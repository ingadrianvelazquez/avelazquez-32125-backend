import MongoStore from 'connect-mongo'
import * as dotenv from 'dotenv'
dotenv.config()
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export const configSession = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGOSTORE_CONN,
        mongoOptions: advancedOptions
    }),
    secret: process.env.MONGOSTORE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 1000 * 60   //ten minutes = 10 * 1000 (millis) * 60 (secs)
    }
}
