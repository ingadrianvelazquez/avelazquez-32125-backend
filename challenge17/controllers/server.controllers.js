// dotenv
import * as dotenv from 'dotenv'
dotenv.config()
//yargs
import yargsImport from 'yargs/yargs'
const yargs = yargsImport(process.argv.slice(2))
const args = yargs
    .default({ port: 8080, mode: 'FORK' })
    .alias({ p: 'port', m: 'mode' })
    .argv

//server
import express from 'express'
const PORT = args.port
const MODE = args.mode
import * as OS from 'os'
const numCPUs = OS.cpus().length

//logger
import pino from 'pino'
const loggerConsole = pino()
loggerConsole.level = 'info'
const loggerWarning = pino('./logs/warning.log')
loggerWarning.level = 'warn'
const loggerError = pino('./logs/error.log')
loggerError.level = 'error'

//templates
import hbs from 'express-handlebars'
//socket
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
// session
import session from 'express-session'
import { configSession } from './session.controllers.js'
// passport
import passport from 'passport'
import { initPassport } from './passport.controllers.js'

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

//config gzip
/* before >> 2.32 kB */
/* after  >> 1.16 kB */
import compression from 'compression'
app.use(compression())

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

initPassport()
app.use(passport.initialize())
app.use(passport.session())

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(uniqueSession));

export { PORT, app, httpServer, io, msgDB, mysqlDB, MODE, numCPUs, loggerConsole, loggerWarning, loggerError }