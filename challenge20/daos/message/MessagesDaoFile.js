import FileContainer from '../../persistence/FileContainer.js'

let instance = null

export default class MessagesDaoFile extends FileContainer {
    constructor() {
        super('messages')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new MessagesDaoFile()
        return instance
    }
}
