const MemoryContainer = require('../../containers/MemoryContainer')

class ProductDaoMemory extends MemoryContainer {
    constructor() {
        super()
    }
    async disconnect() { }
}

module.exports = ProductDaoMemory
