import { FirebaseContainer } from '../../persistence/FirebaseContainer.js'

export default class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }
    async disconnect() {
        //silence is gold
    }
}
