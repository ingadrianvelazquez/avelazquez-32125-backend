import { MemoryContainer } from '../../persistence/MemoryContainer.js'

export default class MessagesDaoMemory extends MemoryContainer {
    constructor() {
        super()
    }
    async disconnect() {
        //silence is gold
    }
}
