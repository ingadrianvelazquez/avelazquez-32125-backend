const FileContainer = require('../../containers/FileContainer')

class ProductDaoFile extends FileContainer {
    constructor() {
        super('products')
    }
    async disconnect() { }
}

module.exports = ProductDaoFile
