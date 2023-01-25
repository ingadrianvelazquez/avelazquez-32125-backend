import FileContainer from '../../persistence/FileContainer'

export default class ProductDaoFile extends FileContainer {
    constructor() {
        super('products')
    }
    async disconnect() {
        //silence is gold
    }
}
