import { FirebaseContainer } from '../../persistence/FirebaseContainer.js'

let instance = null

export default class UserDaoFirebase extends FirebaseContainer {
    constructor() {
        super('users')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new UserDaoFirebase()
        return instance
    }
}
