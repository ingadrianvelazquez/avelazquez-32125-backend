const express = require('express')
const { Router } = express
const hbs = require('express-handlebars')

const app = express()
const router = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../public'))

const Catalog = require("../model/Catalog.js");
const catalog = new Catalog();

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'default.hbs'
}))

app.set('views', './views')
app.set('view engine', 'hbs')

router.get('/', (req, res) => {
    res.render('products.hbs', { products: catalog.getAll() })
})

router.post('/', (req, res) => {
    res.render('index.hbs', { msg: catalog.addProduct(req.body) })
})

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.use('/products', router)

app.listen(process.env.PORT || 8080, () => console.log('Server UP'));
