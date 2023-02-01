import { faker } from '@faker-js/faker/locale/es';
import { loggerConsole } from './server.controllers.js'

export const fakerControllerGet = (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const cnt = req.params.count && !isNaN(req.params.count) ? req.params.count : 5
    res.json(populate(cnt))
}

const populate = (count = 5) => {
    let fakeProds = []
    for (let i = 0; i < count; i++) {
        fakeProds.push(getRandomProduct())
    }
    return fakeProds
}

export const getRandomProduct = () => {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(64, 64, 'technics', true)
    }
}

import MessageDto from '../dtos/MessageDto.js'

export const getRandomMessage = () => {
    return new MessageDto({
        email: faker.internet.email(),
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        age: faker.random.numeric(2),
        alias: faker.internet.userName(),
        avatar: faker.internet.avatar(),
        msg: faker.lorem.sentence()
    })
}