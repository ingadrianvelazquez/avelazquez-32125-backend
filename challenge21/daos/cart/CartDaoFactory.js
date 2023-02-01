import CartDaoFile from './CartDaoFile.js'
import CartDaoMemory from './CartDaoMemory.js'
import CartDaoMongoDB from './CartDaoMongoDB.js'

import { DAOSOURCE } from '../../controllers/server.controllers.js'
let daoSource = null

switch (DAOSOURCE.toLowerCase()) {
    case 'mongo':
        daoSource = new CartDaoMongoDB()
        break
    case 'file':
        daoSource = new CartDaoFile()
        break
    default:
        daoSource = new CartDaoMemory()
}

export default class CartDaoFactory {
    static getDaoSource() {
        return daoSource
    }
}
