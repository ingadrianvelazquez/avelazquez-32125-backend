import { populate } from '../controllers/server.controllers.js'
import { loggerConsole } from '../controllers/server.controllers.js'

import Router from 'express'
export const fakerRouter = Router()

fakerRouter.get('/:count?', async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const cnt = req.params.count && !isNaN(req.params.count) ? req.params.count : 5
    res.json(populate(cnt))
})
