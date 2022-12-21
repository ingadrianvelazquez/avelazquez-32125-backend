import Router from 'express'
export const infoRouter = Router()
import { numCPUs, loggerConsole } from '../controllers/server.controllers.js'
import { viewOnConsole } from '../utils/helper.js'

infoRouter.get('/', (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    viewOnConsole()
    res.render('info.hbs', { processInfo: process, numCPUs: numCPUs })
})
