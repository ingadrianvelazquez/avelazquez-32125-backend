import { FirebaseContainer } from '../../persistence/FirebaseContainer.js'

export default class MessagesDaoFirebase extends FirebaseContainer {
    constructor() {
        super('messages')
    }
    async disconnect() {
        //silence is gold
    }
}
