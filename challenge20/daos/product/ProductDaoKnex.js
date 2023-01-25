import { DataBaseKnexContainer } from '../../persistence/DataBaseKnexContainer'

let instance = null

export default class ProductDaoKnex extends DataBaseKnexContainer {
    constructor(knex) {
        super(knex, 'products')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new ProductDaoKnex()
        return instance
    }
}
