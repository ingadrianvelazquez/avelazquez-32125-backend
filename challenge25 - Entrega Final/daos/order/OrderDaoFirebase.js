import { FirebaseContainer } from '../../persistence/FirebaseContainer.js'

let instance = null

export default class OrderDaoFirebase extends FirebaseContainer {
    constructor() {
        super('orders')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new OrderDaoFirebase()
        return instance
    }
}
