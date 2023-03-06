import Router from 'express'
export const chatRouter = Router()

import { chatControllerGet, chatControllerCreate } from '../controllers/chat.controllers.js'

chatRouter.get('/:email', chatControllerGet)

chatRouter.post('/', chatControllerCreate)
