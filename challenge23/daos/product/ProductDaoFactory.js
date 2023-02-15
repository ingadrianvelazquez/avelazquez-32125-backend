import ProductDaoFile from './ProductDaoFile.js'
import ProductDaoMemory from './ProductDaoMemory.js'
import ProductDaoMongoDB from './ProductDaoMongoDB.js'

import { DAOSOURCE } from '../../controllers/server.controllers.js'
let daoSource = null

switch (DAOSOURCE.toLowerCase()) {
    case 'mongo':
        daoSource = new ProductDaoMongoDB()
        break
    case 'file':
        daoSource = new ProductDaoFile()
        break
    default:
        daoSource = new ProductDaoMemory()
}

export default class ProductDaoFactory {
    static getDaoSource() {
        return daoSource
    }
}
