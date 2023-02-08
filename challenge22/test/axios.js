import axios from 'axios'
import { httpServer as server } from '../server.js'

let newID
const url = `http://localhost:${server.address().port}/api/products`

const getProducts = async () => {
    await axios.get(url)
        .then(resp => console.log('GET /\n     --> product count: ' + resp.data.length))
}

const getRealProduct = async (id) => {
    await axios.get(`${url}/${id}`)
        .then(resp => console.log('GET /realID\n     --> product name: ' + resp.data.name))
}

const getFakeProduct = async () => {
    await axios.get(`${url}/93bf08fe6a2bacbf79c50c89`)
        .then(resp => console.log('GET /fakeID\n     --> product name: ' + resp.data.name))
}

const createProduct = async () => {
    await axios.post(url, {
        "name": "Tolkien Deluxe Pack",
        "desc": "The Hobbit + Lord of the Ring Trilogy",
        "code": "",
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmyemEh2SytB5TscqjAn5rS6vfrvODzdkOQ&usqp=CAU",
        "price": "149.99",
        "stock": "980"
    })
        .then(resp => {
            newID = resp.data;
            console.log('POST /\n     --> new product ID: ' + newID)
        })
}

const updateProduct = async (id) => {
    await axios.put(`${url}/${id}`, {
        "name": "Tolkien Deluxe Edition",
        "stock": "984"
    })
        .then(resp => console.log('PUT /newID\n     --> description: ' + resp.data.description))
}

const deleteProduct = async (id) => {
    await axios.delete(`${url}/${id}`)
        .then(resp => console.log('DELETE /newID\n     --> description: ' + resp.data.description))
}

(async () => {
    await getProducts()
    await getRealProduct('63bf08fe6a2bacbf79c50c84')
    await getFakeProduct()
    await createProduct()
    await getProducts()
    await updateProduct(newID)
    await getRealProduct(newID)
    await deleteProduct(newID)
    await getProducts()
})()
