import { MongoDBContainer } from '../../persistence/MongoDBContainer.js'
import { productModel } from '../../dtos/Product.js'

export default class ProductDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(productModel)
    }
    async disconnect() {
        //silence is gold
    }
}
