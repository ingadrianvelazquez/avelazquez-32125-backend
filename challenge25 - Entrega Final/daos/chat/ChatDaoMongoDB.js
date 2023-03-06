import { MongoDBContainer } from '../../persistence/MongoDBContainer.js'
import { chatModel } from '../../models/Chat.js'

let instance = null

export default class ChatDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(chatModel)
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new ChatDaoMongoDB()
        return instance
    }
}
