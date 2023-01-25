import { DataBaseKnexContainer } from '../../persistence/DataBaseKnexContainer'

export default class ProductDaoKnex extends DataBaseKnexContainer {
    constructor(knex) {
        super(knex, 'products')
    }
    async disconnect() {
        //silence is gold
    }
}
