import { io, msgDB, sqlite3DBProd } from './server.controllers.js'
import { getRandomProduct, getRandomMessage } from '../routes/faker.routes.js'
import { getNormalizedData } from './normalizr.controllers.js'
import Message from '../models/Message.js'

//sockets operations
export const socketController = async socket => {
    const listProds = await sqlite3DBProd.getAll()
    socket.emit('updateCatalog', listProds)
    const listMsgs = await msgDB.getAll()
    const normalizedData = getNormalizedData(listMsgs)
    socket.emit('updateMessages', normalizedData.data)
    socket.emit('updateCompressRate', normalizedData.rate)

    socket.on('sendMessage', async data => {
        const { email, name, surname, age, alias, avatar, msg } = data;
        const msgElement = new Message(email, name, surname, age, alias, avatar, msg)
        await msgDB.save(msgElement)
        const listMsgs = await msgDB.getAll()
        io.sockets.emit('updateMessages', listMsgs)
    })

    socket.on('addMsgRandom', async () => {
        const data = getRandomMessage()
        await msgDB.save(data)
        const listMsgs = await msgDB.getAll()
        io.sockets.emit('updateMessages', listMsgs)
    })

    socket.on('addProductRandom', async () => {
        const data = getRandomProduct()
        await sqlite3DBProd.save(data)
        const listProds = await sqlite3DBProd.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

    socket.on('addProduct', async data => {
        await sqlite3DBProd.save(data)
        const listProds = await sqlite3DBProd.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

    socket.on('deleteProduct', async data => {
        const { id } = data;
        await sqlite3DBProd.deleteById(id)
        const listProds = await sqlite3DBProd.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

}
