import { FirebaseContainer } from '../../persistence/FirebaseContainer'

let instance = null

export default class ProductDaoFirebase extends FirebaseContainer {
    constructor() {
        super('products')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new ProductDaoFirebase()
        return instance
    }
}
