const FileContainer = require('../../containers/FileContainer')

class CartDaoFile extends FileContainer {
    constructor() {
        super('carts')
    }
    async disconnect() { }
}

module.exports = CartDaoFile
