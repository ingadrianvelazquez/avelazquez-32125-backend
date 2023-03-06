import FileContainer from '../../persistence/FileContainer.js'

let instance = null

export default class ChatDaoFile extends FileContainer {
    constructor() {
        super('chat')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new ChatDaoFile()
        return instance
    }
}
