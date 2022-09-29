const express = require('express')
const { Router } = express

const app = express()
const router = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const Catalog = require("./classes/Catalog.js");
const catalog = new Catalog();

router.get('/:id', (req, res) => {
    res.json(catalog.getById(req.params.id))
})

router.put('/:id', (req, res) => {
    res.json(catalog.updateProduct(req.params.id, req.body))
})

router.delete('/:id', (req, res) => {
    res.json(catalog.removeById(req.params.id))
})

router.get('/', (req, res) => {
    res.json(catalog.getAll())
})

router.post('/', (req, res) => {
    res.json(catalog.addProduct(req.body))
})

app.use('/api/productos', router)

app.listen(process.env.PORT || 8080, () => console.log('Server UP'));
