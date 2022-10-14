const { Router } = require('express')
const productRouter = Router()

const Product = require("../models/Product.js");
const File = require("../persistence/File.js");
const catalog = new File('products');

productRouter.get('/:id?', (req, res) => {
    if (req.params.id)
        res.json(catalog.getById(+req.params.id))
    else
        res.json(catalog.getAll())
})

productRouter.post('/', (req, res) => {
    const data = req.body
    const prod = new Product(data.name, data.desc, data.code, data.url, data.price, data.stock)
    res.json(catalog.save(prod))
})

productRouter.put('/:id', (req, res) => {
    res.json(catalog.update(+req.params.id, req.body))
})

productRouter.delete('/:id', (req, res) => {
    res.json(catalog.deleteById(+req.params.id))
})

productRouter.delete('/', (req, res) => {
    res.json(catalog.deleteAll())
})

module.exports = productRouter