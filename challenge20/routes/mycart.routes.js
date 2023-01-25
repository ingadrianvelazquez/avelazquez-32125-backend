import Router from 'express'
export const myCartRouter = Router()
import { mycartControllerGet, mycartControllerDeleteProd, mycartControllerSendOrder } from '../controllers/mycart.controllers.js'

myCartRouter.get('/', mycartControllerGet)

myCartRouter.get('/delete/:id/products/:id_prod', mycartControllerDeleteProd)

myCartRouter.post('/send-order', mycartControllerSendOrder)
