import { FirebaseContainer } from '../../persistence/FirebaseContainer.js'

let instance = null

export default class MessagesDaoFirebase extends FirebaseContainer {
    constructor() {
        super('messages')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new MessagesDaoFirebase()
        return instance
    }
}
