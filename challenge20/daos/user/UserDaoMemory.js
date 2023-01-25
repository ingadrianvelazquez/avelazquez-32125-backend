import { MemoryContainer } from '../../persistence/MemoryContainer.js'

export default class UserDaoMemory extends MemoryContainer {
    constructor() {
        super()
    }
    async disconnect() {
        //silence is gold
    }
}
