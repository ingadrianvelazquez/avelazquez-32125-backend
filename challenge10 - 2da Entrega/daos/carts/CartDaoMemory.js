const MemoryContainer = require('../../containers/MemoryContainer')

class CartDaoMemory extends MemoryContainer {
    constructor() {
        super()
    }
    async disconnect() { }
}

module.exports = CartDaoMemory
