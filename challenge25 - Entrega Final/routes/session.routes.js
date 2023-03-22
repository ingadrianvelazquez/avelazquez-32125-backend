import Router from 'express'
import passport from 'passport'
export const sessionRouter = Router()
import { loggerConsole } from '../controllers/server.controllers.js'
import { sessionControllerLogin, sessionControllerLogout, sessionControllerPostLogin } from '../controllers/session.controllers.js'

sessionRouter.get('/', sessionControllerLogin)

sessionRouter.get('/logout', sessionControllerLogout)

sessionRouter.get('/login', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.render('login.hbs')
})

sessionRouter.get('/login-error', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.render('login-error.hbs')
})

sessionRouter.post('/login', sessionControllerPostLogin)

sessionRouter.get('/signup', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.render('register.hbs')
})

sessionRouter.get('/signup-error', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.render('register-error.hbs')
})

sessionRouter.get('/signup-success', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.render('login-ok.hbs')
})

sessionRouter.post('/signup', passport.authenticate('signup', {
    successRedirect: '/signup-success',
    failureRedirect: '/signup-error',
}))
