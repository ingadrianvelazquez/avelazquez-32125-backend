import Message from '../models/Message.js'
import { faker } from '@faker-js/faker/locale/es';

export const populate = (count = 5) => {
    let fakeProds = []
    for (let i = 0; i < count; i++) {
        fakeProds.push(getRandomProduct())
    }
    return fakeProds
}

export function getRandomProduct() {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(64, 64, 'technics', true)
    }
}

export function getRandomMessage() {
    return new Message(
        faker.internet.email(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.random.numeric(2),
        faker.internet.userName(),
        faker.internet.avatar(),
        faker.lorem.sentence()
    )
}