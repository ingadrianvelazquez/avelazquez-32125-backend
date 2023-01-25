import { MongoDBContainer } from '../../persistence/MongoDBContainer.js'
import { productModel } from '../../models/Product.js'

let instance = null

export default class ProductDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(productModel)
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new ProductDaoMongoDB()
        return instance
    }
}
