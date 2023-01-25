import FileContainer from '../../persistence/FileContainer.js'

export default class CartDaoFile extends FileContainer {
    constructor() {
        super('carts')
    }
    async disconnect() {
        //silence is gold
    }
}
