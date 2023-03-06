import ChatDaoFile from './ChatDaoFile.js'
import ChatDaoMemory from './ChatDaoMemory.js'
import ChatDaoMongoDB from './ChatDaoMongoDB.js'

import { DAOSOURCE } from '../../controllers/server.controllers.js'
let daoSource = null

switch (DAOSOURCE.toLowerCase()) {
    case 'mongo':
        daoSource = new ChatDaoMongoDB()
        break
    case 'file':
        daoSource = new ChatDaoFile()
        break
    default:
        daoSource = new ChatDaoMemory()
}

export default class ChatDaoFactory {
    static getDaoSource() {
        return daoSource
    }
}
