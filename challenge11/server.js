//server
import express from 'express'
const PORT = process.env.PORT || 8081
//templates
import hbs from 'express-handlebars'
//socket
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

//database
import { mysqlConn, sqlite3Conn } from './persistence/config/connection.js'
import { createTableProducts, createTableMessages } from './persistence/config/create.js'
const tables = { mysql: 'products', sqlite3: 'messages' }
import knex from 'knex'
const mysqlKnex = knex(mysqlConn);
const sqlite3Knex = knex(sqlite3Conn);

// faker
import { fakerRouter, getRandomProduct, getRandomMessage } from './utils/faker.js'
//normalizr
import { getNormalizedData } from './utils/normalizr.js'
//model
import Message from './models/Message.js'


//config server
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//config dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config templates
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//config database
import DataBase from "./persistence/Database.js"
const mysqlDB = new DataBase(mysqlKnex, tables.mysql)
const sqlite3DB = new DataBase(sqlite3Knex, tables.sqlite3)

// messages container
import MessagesDaoFile from "./daos/MessagesDaoFile.js"
const msgDB = new MessagesDaoFile()

/*-------------------------------------*/
/* create tables and insert test data  */
/*-------------------------------------*/
const createFromScratch = async () => {
    await createTableProducts(mysqlKnex, tables.mysql)
    await createTableMessages(sqlite3Knex, tables.sqlite3)
    await sqlite3DB.save({ email: 'bot@welcome.com', msg: 'Bienvenid@ al chat!', date: new Date(Date.now()).toLocaleString() })
    await mysqlDB.save({ title: 'Lord of the Ring', price: '149.99', thumbnail: 'https://cf.shopee.sg/file/06b4f2ae620ef8577b3ed6a0bb00c26e' })
}
//createFromScratch();


//config HBS
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'default.hbs'
}))
app.set('views', './views')
app.set('view engine', 'hbs')

//config routes
app.use('/api/products-test', fakerRouter)
app.get('/', (req, res) => {
    res.render('index.hbs')
})

//listener
httpServer.listen(PORT, () => console.log(`Server UP on ${PORT}`));

//sockets operations
io.on('connection', async socket => {
    const listProds = await mysqlDB.getAll()
    socket.emit('updateCatalog', listProds)

    //const listMsgs = await sqlite3DB.getAll()
    const listMsgs = await msgDB.getAll()
    const normalizedData = getNormalizedData(listMsgs)
    //socket.emit('updateMessages', listMsgs)
    socket.emit('updateMessages', normalizedData.data)
    socket.emit('updateCompressRate', normalizedData.rate)

    socket.on('sendMessage', async data => {
        const { email, name, surname, age, alias, avatar, msg } = data;
        const msgElement = new Message(email, name, surname, age, alias, avatar, msg)
        //await sqlite3DB.save(msgElement)
        await msgDB.save(msgElement)
        //const listMsgs = await sqlite3DB.getAll()
        const listMsgs = await msgDB.getAll()
        io.sockets.emit('updateMessages', listMsgs)
    })

    socket.on('addMsgRandom', async () => {
        const data = getRandomMessage()
        await msgDB.save(data)
        const listMsgs = await msgDB.getAll()
        io.sockets.emit('updateMessages', listProds)
    })

    socket.on('addProductRandom', async () => {
        const data = getRandomProduct()
        await mysqlDB.save(data)
        const listProds = await mysqlDB.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

    socket.on('addProduct', async data => {
        await mysqlDB.save(data)
        const listProds = await mysqlDB.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

    socket.on('deleteProduct', async data => {
        const { id } = data;
        await mysqlDB.deleteById(id)
        const listProds = await mysqlDB.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

})
