import { sqlite3Knex, tables, sqlite3DBProd, sqlite3DBMsg } from '../controllers/server.controllers.js'
import { createTableProducts, createTableMessages } from '../persistence/config/create.js'

/*-------------------------------------*/
/* create tables and insert test data  */
/*-------------------------------------*/
export const createFromScratch = async () => {
    //await createTableProducts(mysqlKnex, tables.mysql)
    await createTableProducts(sqlite3Knex, tables.prod)
    //await createTableMessages(sqlite3Knex, tables.sqlite3)
    await createTableMessages(sqlite3Knex, tables.msg)
    //await sqlite3DB.save({ email: 'bot@welcome.com', msg: 'Bienvenid@ al chat!', date: new Date(Date.now()).toLocaleString() })
    await sqlite3DBMsg.save({ email: 'bot@welcome.com', msg: 'Bienvenid@ al chat!', date: new Date(Date.now()).toLocaleString() })
    //await mysqlDB.save({ title: 'Lord of the Ring', price: '149.99', thumbnail: 'https://cf.shopee.sg/file/06b4f2ae620ef8577b3ed6a0bb00c26e' })
    await sqlite3DBProd.save({ title: 'Lord of the Ring', price: '149.99', thumbnail: 'https://cf.shopee.sg/file/06b4f2ae620ef8577b3ed6a0bb00c26e' })
}
