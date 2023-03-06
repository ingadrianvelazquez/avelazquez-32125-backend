import { MongoDBContainer } from '../../persistence/MongoDBContainer.js'
import { orderModel } from '../../models/Order.js'

let instance = null

export default class OrderDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(orderModel)
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new OrderDaoMongoDB()
        return instance
    }
}
