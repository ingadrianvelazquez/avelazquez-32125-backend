import Router from 'express'
export const randomRouter = Router()
import { randomControllerGet } from '../controllers/random.controller.js'

randomRouter.get('/:count?', randomControllerGet)
