const FirebaseContainer = require('../../containers/FirebaseContainer')

class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }
    async disconnect() { }
}

module.exports = CartDaoFirebase
