import { MongoDBContainer } from '../../persistence/MongoDBContainer.js'
import { messageModel } from '../../models/Message.js'

let instance = null

export default class MessagesDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(messageModel)
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new MessagesDaoMongoDB()
        return instance
    }
}
