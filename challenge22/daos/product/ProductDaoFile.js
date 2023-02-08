import FileContainer from '../../persistence/FileContainer.js'

let instance = null

export default class ProductDaoFile extends FileContainer {
    constructor() {
        super('products')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new ProductDaoFile()
        return instance
    }
}
