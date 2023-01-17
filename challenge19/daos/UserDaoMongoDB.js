import { MongoDBContainer } from '../persistence/MongoDBContainer.js'
import { userModel } from '../models/User.js'

export default class UserDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(userModel)
    }
    async disconnect() {
        // silence is gold
    }
}
