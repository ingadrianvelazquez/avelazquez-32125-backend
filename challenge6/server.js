const express = require('express')
const hbs = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const messages = [
    { email: 'bot@welcome.com', msg: 'Bienvenid@ al chat!', date: new Date(Date.now()).toLocaleString() }
]

const prods = [
    { title: 'Lord of the Ring', price: '149.99', thumbnail: 'https://cf.shopee.sg/file/06b4f2ae620ef8577b3ed6a0bb00c26e', id: 1 }
]

const Catalog = require("./model/Catalog.js");
const catalog = new Catalog(prods);

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'default.hbs'
}))

app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index.hbs')
})

httpServer.listen(process.env.PORT || 8080, () => console.log('Server UP'));

io.on('connection', async socket => {
    socket.emit('updateMessages', messages)
    const listProds = await catalog.getAll()
    socket.emit('updateCatalog', listProds)

    await socket.on('sendMessage', data => {
        const { email, msg } = data;
        messages.push({ email: email, msg: msg, date: new Date(Date.now()).toLocaleString() })
        io.sockets.emit('updateMessages', messages)
    })

    await socket.on('addProduct', async data => {
        await catalog.addProduct(data)
        const listProds = await catalog.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

})
