import Router from 'express'
export const productRouter = Router()

import { productControllerGet, productControllerCreate } from '../controllers/product.controller.js'
import ProductDaoFactory from '../daos/product/ProductDaoFactory.js'
const catalog = ProductDaoFactory.getDaoSource();

productRouter.get('/:id?', productControllerGet)

productRouter.post('/', productControllerCreate)

productRouter.put('/:id', async (req, res) => {
    res.json(await catalog.update(req.params.id, req.body))
})

productRouter.delete('/:id', async (req, res) => {
    res.json(await catalog.deleteById(req.params.id))
})

productRouter.delete('/', async (req, res) => {
    res.json(await catalog.deleteAll())
})
