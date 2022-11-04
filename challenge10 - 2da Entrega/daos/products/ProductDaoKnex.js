const DataBaseKnexContainer = require('../../containers/DataBaseKnexContainer')

class ProductDaoKnex extends DataBaseKnexContainer {
    constructor(knex) {
        super(knex, 'products')
    }
    async disconnect() { }
}

module.exports = ProductDaoKnex
