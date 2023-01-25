import { MemoryContainer } from '../../persistence/MemoryContainer'

export default class ProductDaoMemory extends MemoryContainer {
    constructor() {
        super()
    }
    async disconnect() {
        //silence is gold
    }
}
