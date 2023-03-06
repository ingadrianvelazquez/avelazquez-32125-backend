import ChatDto from '../dtos/ChatDto.js'
import ChatDaoFactory from '../daos/chat/ChatDaoFactory.js'
const chat = ChatDaoFactory.getDaoSource();
import { loggerConsole } from './server.controllers.js'

export const chatControllerCreate = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })    
    const data = req.body
    const newChat = new ChatDto(data)
    res.json(await chat.save(newChat))
}

export const chatControllerGet = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    res.json(await chat.getLeanByKeyValue('email', req.params.email))
}
