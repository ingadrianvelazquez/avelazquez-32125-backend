const FirebaseContainer = require('../../containers/FirebaseContainer')

class ProductDaoFirebase extends FirebaseContainer {
    constructor() {
        super('products')
    }
    async disconnect() { }
}

module.exports = ProductDaoFirebase
