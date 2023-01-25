import { MemoryContainer } from '../../persistence/MemoryContainer.js'

export default class CartDaoMemory extends MemoryContainer {
    constructor() {
        super()
    }
    async disconnect() {
        //silence is gold
    }
}
