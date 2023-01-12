import { MongoDBContainer } from '../persistence/MongoDBContainer.js'
import { cartModel } from '../models/Cart.js'

export default class CartDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(cartModel)
    }
    async disconnect() { }
}
