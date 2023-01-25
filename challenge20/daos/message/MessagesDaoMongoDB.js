import { MongoDBContainer } from '../../persistence/MongoDBContainer.js'
import { messageModel } from '../../dtos/Cart.js'

export default class MessagesDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(messageModel)
    }
    async disconnect() {
        //silence is gold
    }
}
