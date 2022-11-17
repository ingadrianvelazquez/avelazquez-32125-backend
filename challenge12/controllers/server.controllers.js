// dotenv
import * as dotenv from 'dotenv'
dotenv.config()

//server
import express from 'express'
const PORT = process.env.PORT || 8081
//templates
import hbs from 'express-handlebars'
//socket
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
// session
import session from 'express-session'
import { configSession } from './session.controllers.js'
//database
import { mysqlConn, sqlite3Conn } from '../persistence/config/connection.js'
const tables = { mysql: 'products', sqlite3: 'messages' }
import knex from 'knex'
const mysqlKnex = knex(mysqlConn);
const sqlite3Knex = knex(sqlite3Conn);

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
import DataBase from "../persistence/Database.js"
const mysqlDB = new DataBase(mysqlKnex, tables.mysql)
const sqlite3DB = new DataBase(sqlite3Knex, tables.sqlite3)

// messages container
import MessagesDaoFile from "../daos/MessagesDaoFile.js"
const msgDB = new MessagesDaoFile()


//config HBS
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/../views/partials',
    layoutsDir: __dirname + '/../views/layouts',
    defaultLayout: 'default.hbs'
}))
app.set('views', __dirname + '/../views')
app.set('view engine', 'hbs')

//config session
const uniqueSession = session(configSession)
app.use(uniqueSession)
// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(uniqueSession));

export { PORT, app, httpServer, io, msgDB, mysqlDB }