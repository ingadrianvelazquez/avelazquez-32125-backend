//daos
let cart = undefined
let knex = undefined
let catalog = undefined

//database knex
const ProductDaoKnex = require("../daos/products/ProductDaoKnex");

//connector
const connector = process.env.CONNECTOR || 'firebase'
switch (connector) {
    case 'firebase':
        const CartDaoFirebase = require("../daos/carts/CartDaoFirebase");
        cart = new CartDaoFirebase();
        const ProductDaoFirebase = require("../daos/products/ProductDaoFirebase.js");
        catalog = new ProductDaoFirebase();
        break;
    case 'mongodb':
        const mongoose = require('mongoose')
        const { mongoConn } = require('../persistence/config/connection')
        mongoose.connect(mongoConn.url, mongoConn.options)

        const CartDaoMongoDB = require("../daos/carts/CartDaoMongoDB");
        cart = new CartDaoMongoDB();
        const ProductDaoMongoDB = require("../daos/products/ProductDaoMongoDB");
        catalog = new ProductDaoMongoDB();
        break;
    case 'mysql':
        const { mysqlConn } = require('./persistence/config/connection')
        knex = require('knex')(mysqlConn);
        catalog = new ProductDaoKnex(knex);
        break;
    case 'sqlite3':
        const { sqlite3Conn } = require('./persistence/config/connection')
        knex = require('knex')(sqlite3Conn);
        catalog = new ProductDaoKnex(knex);
        break;
}

module.exports = { catalog, cart }



/*---------------------------*/
/*   mysql/sqlite3 options   */
/*---------------------------*/
//const { createTableProducts } = require('../persistence/config/create')

/* create tables and insert test data */
const createFromScratch = async () => {
    await createTableProducts(mysqlKnex, tables.mysql)
}
//createFromScratch();
