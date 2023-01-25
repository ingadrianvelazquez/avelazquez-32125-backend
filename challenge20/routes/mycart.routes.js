import Router from 'express'
export const myCartRouter = Router()
import { actualUser } from '../routes/session.routes.js'
import { actualCart } from '../controllers/socket.controllers.js'
import { loggerConsole } from '../controllers/server.controllers.js'

import UserDaoMongoDB from '../daos/user/UserDaoMongoDB.js'
const user = new UserDaoMongoDB();
import CartDaoMongoDB from '../daos/cart/CartDaoMongoDB.js'
const cart = new CartDaoMongoDB();

import { sendMail } from '../controllers/nodemailer.controller.js';
import { sendWhatsApp } from '../controllers/twilio.controller.js';

myCartRouter.get('/', async (req, res, next) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    let currentCart = ''
    const datos = await user.getLeanByKeyValue('user', actualUser)
    //https://mongoosejs.com/docs/tutorials/lean.html
    if (actualCart == '')
        currentCart = await cart.getLeanByKeyValue('user', actualUser)
    else
        currentCart = await cart.getLeanById(actualCart)

    const currentCartID = currentCart ? currentCart._id.toString().replace('new ObjectId("', '').replace('")', '') : ''
    const totalCart = currentCart ? getTotal(currentCart) : 0
    const products = currentCart ? currentCart.products : []
    res.render('cart.hbs', { username: actualUser, idcart: currentCartID, total: totalCart, datos: datos, products: products })
})

myCartRouter.get('/delete/:id/products/:id_prod', async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const idCart = req.params.id
    const actualCart = await cart.getById(idCart)
    if (actualCart.error)
        res.json(actualCart)
    else {
        const idProd = req.params.id_prod
        if (actualCart.products.find(elem => elem === idProd || elem._id.toString() === idProd)) {
            actualCart.products = actualCart.products.filter(elem => elem !== idProd && elem._id.toString() !== idProd)
            await cart.update(idCart, actualCart)
            res.redirect('/mycart')
        } else
            res.json({ 'error': 2, 'description': `Element ID ${idProd} Not Found` })
    }
})

myCartRouter.post('/send-order', async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const idCart = req.body.idCart
    const currentCart = await cart.getLeanById(idCart)
    const datos = await user.getLeanByKeyValue('user', actualUser)
    const total = getTotal(currentCart)

    sendMail(`${process.env.SUBJECT_NEWORDER} ${datos.fullname}, ${datos.username}.`, currentCart.products, `Total: $${total}`)
    sendWhatsApp(datos, JSON.stringify(currentCart.products), total)

    await cart.deleteById(idCart)
    //res.render('cart.hbs', { username: actualUser, idcart: currentCartID, total: totalCart, datos: datos, products: currentCart.products })
    res.redirect('/')
})

const getTotal = cart => {
    let ret = 0
    let cant = cart.products.length
    for (let i = 0; i < cant; i++) {
        ret += cart.products[i].price
    }
    return (Math.round(ret * 100) / 100).toFixed(2)
}