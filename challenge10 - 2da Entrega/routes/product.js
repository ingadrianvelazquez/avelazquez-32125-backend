const { Router } = require('express')
const productRouter = Router()

const { catalog } = require('./config')
const { Product } = require("../models/Product.js");

productRouter.get('/:id?', async (req, res) => {
    if (req.params.id)
        res.json(await catalog.getById(req.params.id))
    else
        res.json(await catalog.getAll())
})

productRouter.post('/', async (req, res) => {
    const data = req.body
    const prod = new Product(data.name, data.desc, data.code, data.url, data.price, data.stock)
    res.json(await catalog.save(prod))
})

productRouter.put('/:id', async (req, res) => {
    res.json(await catalog.update(req.params.id, req.body))
})

productRouter.delete('/:id', async (req, res) => {
    res.json(await catalog.deleteById(req.params.id))
})

productRouter.delete('/', async (req, res) => {
    res.json(await catalog.deleteAll())
})

module.exports = productRouter