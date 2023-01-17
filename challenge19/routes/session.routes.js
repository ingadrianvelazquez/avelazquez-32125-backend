import Router from 'express'
import passport from 'passport'
export const sessionRouter = Router()
import { loggerConsole } from '../controllers/server.controllers.js'

let sessionActive = undefined

sessionRouter.get('/', (req, res, next) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    // I don't use middleware to avoid wasting more time with hbs
    if (req.isAuthenticated()) {
        sessionActive = true
        req.session.loggedin = true
        res.render('index.hbs', { username: req.session.passport.user.username })
    } else {
        sessionActive = sessionActive === true ? false : undefined
        res.render('login.hbs', sessionActive !== undefined && !sessionActive ? { msgError: 'Session Expired' } : '')
    }
})

sessionRouter.get('/logout', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const username = req.session.user
    req.session.destroy(err => {
        if (err) return res.send(err)
        sessionActive = false
        res.render('logout.hbs', { username: username, timeoutRefresh: 3000 })  //3 seconds
    })
})

sessionRouter.get('/login', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.render('login.hbs')
})

sessionRouter.get('/login-error', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.render('login-error.hbs')
})

// sessionRouter.post('/login', (req, res) => {
//     loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
//     const { username, password } = req.body
//     if (username != process.env.TESTING_USER) {
//         res.render('login.hbs', { msgError: 'Wrong Credentials' })
//     } else {
//         req.session.user = username
//         req.session.loggedin = true
//         sessionActive = true
//         res.redirect('/')
//     }
// })

sessionRouter.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login-error',
}))

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
