import { FirebaseContainer } from '../../persistence/FirebaseContainer.js'

export default class UserDaoFirebase extends FirebaseContainer {
    constructor() {
        super('users')
    }
    async disconnect() {
        //silence is gold
    }
}
