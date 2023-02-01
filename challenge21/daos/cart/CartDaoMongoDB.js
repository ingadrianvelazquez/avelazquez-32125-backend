import { MongoDBContainer } from '../../persistence/MongoDBContainer.js'
import { cartModel } from '../../models/Cart.js'

let instance = null

export default class CartDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(cartModel)
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new CartDaoMongoDB()
        return instance
    }
}
