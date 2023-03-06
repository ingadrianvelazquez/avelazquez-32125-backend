import Router from 'express'
export const orderRouter = Router()

import { orderControllerGet, orderByUserControllerGet } from '../controllers/order.controllers.js'

orderRouter.get('/:id?', orderControllerGet)

orderRouter.get('/user/:email', orderByUserControllerGet)
