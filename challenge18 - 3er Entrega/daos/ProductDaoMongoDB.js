import { MongoDBContainer } from '../persistence/MongoDBContainer.js'
import { productModel } from '../models/Product.js'

export default class ProductDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(productModel)
    }
    async disconnect() { }
}
