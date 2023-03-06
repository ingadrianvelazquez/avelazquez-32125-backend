import ProductDto from '../dtos/ProductDto.js'
import ProductDaoFactory from '../daos/product/ProductDaoFactory.js'
const catalog = ProductDaoFactory.getDaoSource();
import { loggerConsole } from './server.controllers.js'

export const productControllerGet = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    if (req.params.id)
        res.json(await catalog.getById(req.params.id))
    else
        res.json(await catalog.getAll())
}

export const productControllerCreate = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const data = req.body
    const prod = new ProductDto(data)
    res.json(await catalog.save(prod))
}

export const productByCategoryControllerGet = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.json(await catalog.getLeanByKeyValue('category', req.params.category))
}
