import OrderDaoFile from './OrderDaoFile.js'
import OrderDaoMemory from './OrderDaoMemory.js'
import OrderDaoMongoDB from './OrderDaoMongoDB.js'

import { DAOSOURCE } from '../../controllers/server.controllers.js'
let daoSource = null

switch (DAOSOURCE.toLowerCase()) {
    case 'mongo':
        daoSource = new OrderDaoMongoDB()
        break
    case 'file':
        daoSource = new OrderDaoFile()
        break
    default:
        daoSource = new OrderDaoMemory()
}

export default class OrderDaoFactory {
    static getDaoSource() {
        return daoSource
    }
}
