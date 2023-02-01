import FileContainer from '../../persistence/FileContainer.js'

let instance = null

export default class UserDaoFile extends FileContainer {
    constructor() {
        super('users')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new UserDaoFile()
        return instance
    }
}
