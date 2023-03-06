import Router from 'express'
export const fakerRouter = Router()

import { fakerControllerGet } from '../controllers/faker.controllers.js'

fakerRouter.get('/:count?', fakerControllerGet)
