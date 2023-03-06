import Router from 'express'
export const productWebRouter = Router()

import { productCategoryControllerGet } from '../controllers/productweb.controller.js'
import ProductDaoFactory from '../daos/product/ProductDaoFactory.js'
const catalog = ProductDaoFactory.getDaoSource();

productWebRouter.get('/:category', productCategoryControllerGet)
