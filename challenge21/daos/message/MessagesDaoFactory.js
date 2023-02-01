import MessagesDaoFile from './MessagesDaoFile.js'
import MessagesDaoMemory from './MessagesDaoMemory.js'
import MessagesDaoMongoDB from './MessagesDaoMongoDB.js'

import { DAOSOURCE } from '../../controllers/server.controllers.js'
let daoSource = null

switch (DAOSOURCE.toLowerCase()) {
    case 'mongo':
        daoSource = new MessagesDaoMongoDB()
        break
    case 'file':
        daoSource = new MessagesDaoFile()
        break
    default:
        daoSource = new MessagesDaoMemory()
}

export default class MessagesDaoFactory {
    static getDaoSource() {
        return daoSource
    }
}
