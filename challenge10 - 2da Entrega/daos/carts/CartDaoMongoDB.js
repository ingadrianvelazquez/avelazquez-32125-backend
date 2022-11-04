const MongoDBContainer = require('../../containers/MongoDBContainer')
const { cartModel } = require("../../models/Cart.js");

class CartDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(cartModel)
    }
    async disconnect() { }
}

module.exports = CartDaoMongoDB
