import FileContainer from '../persistence/FileContainer.js'

export default class MessagesDaoFile extends FileContainer {
    constructor() {
        super('messages')
    }
    async disconnect() { }
}
