import OrderDto from '../dtos/OrderDto.js'
import OrderDaoFactory from '../daos/order/OrderDaoFactory.js'
const order = OrderDaoFactory.getDaoSource();
import { loggerConsole } from './server.controllers.js'

export const orderControllerCreate = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const data = req.body
    const newOrder = new OrderDto(data.products)
    res.json(await order.save(newOrder))
}

export const orderControllerGet = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    if (req.params.id)
        res.json(await order.getById(req.params.id))
    else
        res.json(await order.getAll())
}

export const orderByUserControllerGet = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.json(await order.getLeanByKeyValue('email', req.params.email))
}
