import Router from 'express'
export const configRouter = Router()
import { loggerConsole } from '../controllers/server.controllers.js'

configRouter.get('/', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.render('config.hbs', { username: req.session.passport.user.username, data: process.env })
})
