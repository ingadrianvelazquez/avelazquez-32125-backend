import { io, sqlite3DBProd } from './server.controllers.js'
import { getRandomProduct, getRandomMessage } from '../controllers/faker.controllers.js'
import { getNormalizedData } from './normalizr.controllers.js'

// messages container
import MessageDto from '../dtos/MessageDto.js'
import MessagesDaoFactory from "../daos/message/MessagesDaoFactory.js"
const msgDB = MessagesDaoFactory.getDaoSource()

//refactor?
import ProductDaoFactory from '../daos/product/ProductDaoFactory.js'
const catalog = ProductDaoFactory.getDaoSource();

import CartDto from '../dtos/CartDto.js'
import CartDaoFactory from '../daos/cart/CartDaoFactory.js'
const cart = CartDaoFactory.getDaoSource();

export let actualCart = ''

//sockets operations
export const socketController = async socket => {
    //const listProds = await sqlite3DBProd.getAll() 
    const listProds = await catalog.getAll()
    socket.emit('updateCatalog', listProds)
    const listMsgs = await msgDB.getAll()
    const normalizedData = getNormalizedData(listMsgs)
    socket.emit('updateMessages', normalizedData.data)
    socket.emit('updateCompressRate', normalizedData.rate)

    socket.on('sendMessage', async data => {
        //const { email, name, surname, age, alias, avatar, msg } = data;
        const msgElement = new MessageDto(data)
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
        // await sqlite3DBProd.save(data)
        // const listProds = await sqlite3DBProd.getAll()
        await catalog.save(data)
        const listProds = await catalog.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

    socket.on('deleteProduct', async data => {
        const { id } = data;
        // await sqlite3DBProd.deleteById(id)
        // const listProds = await sqlite3DBProd.getAll()
        await catalog.deleteById(id)
        const listProds = await catalog.getAll()
        io.sockets.emit('updateCatalog', listProds)
    })

    socket.on('addToCart', async data => {
        const { userEmail, id } = data;
        const prod = await catalog.getById(id)
        const searchCart = await cart.getByKeyValue('user', userEmail)
        actualCart = searchCart == undefined ? '' : searchCart._id.toString().replace('new ObjectId("', '').replace('")', '')
        if (actualCart == '') {
            const newCart = new CartDto(userEmail, prod)
            actualCart = await cart.save(newCart)
        } else {
            const currentCart = await cart.getById(actualCart)
            currentCart.products.push(prod)
            await cart.update(actualCart, currentCart)
        }
        io.sockets.emit('addToCartOK')
    })

}
