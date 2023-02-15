import { MongoDBContainer } from '../../persistence/MongoDBContainer.js'
import { userModel } from '../../models/User.js'

let instance = null

export default class UserDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(userModel)
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new UserDaoMongoDB()
        return instance
    }
}
