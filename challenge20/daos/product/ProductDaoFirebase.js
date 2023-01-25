import { FirebaseContainer } from '../../persistence/FirebaseContainer'

export default class ProductDaoFirebase extends FirebaseContainer {
    constructor() {
        super('products')
    }
    async disconnect() {
        //silence is gold
    }
}
