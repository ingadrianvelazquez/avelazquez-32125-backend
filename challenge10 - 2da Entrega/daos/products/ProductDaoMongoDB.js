const MongoDBContainer = require('../../containers/MongoDBContainer')
const { productModel } = require("../../models/Product.js");

class ProductDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(productModel)
    }
    async disconnect() { }
}

module.exports = ProductDaoMongoDB
