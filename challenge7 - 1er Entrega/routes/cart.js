const { Router } = require('express')
const cartRouter = Router()

const Cart = require("../models/Cart.js");
const File = require("../persistence/File.js");
const catalog = new File('products');
const cart = new File('cart');

cartRouter.post('/', (req, res) => {
    const data = req.body
    const newCart = new Cart(data.products)
    res.json(cart.save(newCart))
})

cartRouter.delete('/:id', (req, res) => {
    res.json(cart.deleteById(+req.params.id))
})

cartRouter.get('/:id/products', (req, res) => {
    const elem = cart.getById(+req.params.id)
    if (elem.error)
        res.json(elem)
    else
        res.json(elem.products)
})

cartRouter.post('/:id/products', (req, res) => {
    const idCart = +req.params.id
    const prod = catalog.getById(+req.body.id_prod)
    if (prod.error)
        res.json(prod)
    else {
        const actualCart = cart.getById(idCart)
        if (actualCart.error)
            res.json(actualCart)
        else {
            actualCart.products.push(prod)
            res.json(cart.update(idCart, actualCart))
        }
    }
})

cartRouter.delete('/:id/products/:id_prod', (req, res) => {
    const idCart = +req.params.id
    const actualCart = cart.getById(idCart)
    if (actualCart.error)
        res.json(actualCart)
    else {
        const idProd = +req.params.id_prod
        if (actualCart.products.find(elem => elem.id === idProd)) {
            actualCart.products = actualCart.products.filter(elem => elem.id !== idProd)
            res.json(cart.update(idCart, actualCart))
        } else
            res.json({ 'error': 2, 'description': `Element ID ${idProd} Not Found` })
    }
})

module.exports = cartRouter