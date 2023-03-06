import FileContainer from '../../persistence/FileContainer.js'

let instance = null

export default class OrderDaoFile extends FileContainer {
    constructor() {
        super('orders')
    }
    async disconnect() {
        //silence is gold
    }
    static getInstance = () => {
        if (!instance)
            instance = new OrderDaoFile()
        return instance
    }
}
