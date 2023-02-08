import { FirebaseContainer } from '../../persistence/FirebaseContainer.js'

let instance = null

export default class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new CartDaoFirebase()
        return instance
    }
}
