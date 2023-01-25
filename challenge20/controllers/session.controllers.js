import MongoStore from 'connect-mongo'
import * as dotenv from 'dotenv'
dotenv.config()
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

import { loggerConsole } from '../controllers/server.controllers.js'

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

let sessionActive = undefined
export let actualUser = ''

export const sessionControllerLogin = async (req, res, next) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    // I don't use middleware to avoid wasting more time with hbs
    if (req.isAuthenticated()) {
        sessionActive = true
        req.session.loggedin = true
        actualUser = req.session.passport.user.username
        const datos = await user.getLeanByKeyValue('user', actualUser)
        res.render('index.hbs', { username: req.session.passport.user.username, datos: datos })
    } else {
        sessionActive = sessionActive === true ? false : undefined
        res.render('login.hbs', sessionActive !== undefined && !sessionActive ? { msgError: 'Session Expired' } : '')
    }
}

export const sessionControllerLogout = (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const username = req.session.user
    req.session.destroy(err => {
        if (err) return res.send(err)
        sessionActive = false
        res.render('logout.hbs', { username: username, timeoutRefresh: 3000 })  //3 seconds
    })
}
