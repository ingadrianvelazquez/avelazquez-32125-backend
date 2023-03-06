import { FirebaseContainer } from '../../persistence/FirebaseContainer.js'

let instance = null

export default class ChatDaoFirebase extends FirebaseContainer {
    constructor() {
        super('chat')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new ChatDaoFirebase()
        return instance
    }
}
