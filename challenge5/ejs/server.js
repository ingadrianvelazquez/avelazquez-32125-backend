const express = require('express')
const { Router } = express

const app = express()
const router = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../public'))

const Catalog = require("../model/Catalog.js");
const catalog = new Catalog();

app.set('views', './views')
app.set('view engine', 'ejs')

router.get('/', (req, res) => {
    res.render('pages/index', { home: false, msg: false, products: catalog.getAll() })
})

router.post('/', (req, res) => {
    res.render('pages/index', { home: true, msg: catalog.addProduct(req.body) })
})

app.get('/', (req, res) => {
    res.render('pages/index', { home: true, msg: false })
})

app.use('/products', router)

app.listen(process.env.PORT || 8080, () => console.log('Server UP'));
