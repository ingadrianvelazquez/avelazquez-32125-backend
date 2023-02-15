import MemoryContainer from '../../persistence/MemoryContainer.js'

let instance = null

export default class ProductDaoMemory extends MemoryContainer {
    constructor() {
        super()
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new ProductDaoMemory()
        return instance
    }
}
