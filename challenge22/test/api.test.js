import supertest from 'supertest'
import { expect } from 'chai'
//import { generar } from './generador/usuarios.js'
import { httpServer as server } from '../server.js'

let request
let newID

describe('Testing Products API Restfull', () => {

    before(async function () {
        request = supertest(`http://localhost:${server.address().port}/api/products`)
    })

    after(function () {
        return server.close()
    })

    describe('GET /', () => {
        it('GET /products should return status 200 and its count', async () => {
            const response = await request.get('/')
            console.log('       --> count: ', response.body.length)
            expect(response.status).to.eql(200)
        })
    })

    describe('GET /realID', () => {
        it('GET /products/realID should return status 200 and its name', async () => {
            const response = await request.get('/63bf08fe6a2bacbf79c50c84')
            expect(response.status).to.eql(200)
            expect(response.body.name).to.eql('Tolkien Deluxe Pack')
        })
    })

    describe('GET /fakeID', () => {
        it('GET /products/fakeID should return status 200 and nothing on body', async () => {
            const response = await request.get('/93bf08fe6a2bacbf79c50c89')
            expect(response.status).to.eql(200)
            expect(response.body).to.eql('')
        })
    })

    describe('POST /', () => {
        it('POST /products should return status 200 and the new 24-character product ID', async () => {
            const auxProd = {
                "name": "Tolkien Deluxe Pack",
                "desc": "The Hobbit + Lord of the Ring Trilogy",
                "code": "",
                "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmyemEh2SytB5TscqjAn5rS6vfrvODzdkOQ&usqp=CAU",
                "price": "149.99",
                "stock": "980"
            }
            const response = await request.post('/').send(auxProd)
            expect(response.status).to.eql(200)
            newID = response.body
            expect(newID).have.length(24)
        })
    })

    describe('GET / after POST', () => {
        it('GET /products after POST should return status 200 and its new count', async () => {
            const response = await request.get('/')
            console.log('       --> count: ', response.body.length)
            expect(response.status).to.eql(200)
        })
    })

    describe('PUT /', () => {
        it('PUT /products/newID should return status 200 and error 0', async () => {
            const auxProd = {
                "name": "Tolkien Deluxe Edition",
                "stock": "984"
            }
            const response = await request.put('/' + newID).send(auxProd)
            expect(response.status).to.eql(200)
            expect(response.body.error).to.eql(0)
        })
    })

    describe('GET / after PUT', () => {
        it('GET /products after PUT should return status 200 and its new stock', async () => {
            const response = await request.get('/' + newID)
            expect(response.status).to.eql(200)
            expect(response.body.stock).to.eql(984)
        })
    })

    describe('DELETE /products/newID', () => {
        it('DELETE /products/newID should return status 200', async () => {
            const response = await request.delete('/' + newID)
            expect(response.status).to.eql(200)
        })
    })

    describe('GET /products after DELETE newID', () => {
        it('GET /products after DELETE newID should return status 200 and its new count', async () => {
            const response = await request.get('/')
            console.log('       --> count: ', response.body.length)
            expect(response.status).to.eql(200)
        })
    })

})
