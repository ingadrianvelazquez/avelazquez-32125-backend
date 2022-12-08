import Router from 'express'
export const infoRouter = Router()
import { numCPUs } from '../controllers/server.controllers.js'
import { viewOnConsole } from '../utils/helper.js'

infoRouter.get('/', (req, res) => {
    viewOnConsole()
    res.render('info.hbs', { processInfo: process, numCPUs: numCPUs })
})
