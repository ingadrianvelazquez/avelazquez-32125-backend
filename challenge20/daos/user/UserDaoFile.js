import FileContainer from '../../persistence/FileContainer.js'

export default class UserDaoFile extends FileContainer {
    constructor() {
        super('users')
    }
    async disconnect() {
        //silence is gold
    }
}
