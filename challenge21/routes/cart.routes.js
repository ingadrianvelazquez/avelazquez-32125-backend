import Router from 'express'
export const cartRouter = Router()

import { cartControllerGet, cartControllerCreate, cartControllerAddProd, cartControllerDelete, cartControllerDeleteProd } from '../controllers/cart.controllers.js'

cartRouter.post('/', cartControllerCreate)

cartRouter.delete('/:id', cartControllerDelete)

cartRouter.get('/:id/products', cartControllerGet)

cartRouter.post('/:id/products', cartControllerAddProd)

cartRouter.delete('/:id/products/:id_prod', cartControllerDeleteProd)
