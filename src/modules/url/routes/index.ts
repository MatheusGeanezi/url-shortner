import { Router } from 'express'
import { createShortUrlController } from '../controllers/postUrlController'
import { authenticateUser } from '../../../middlewares/authMiddleware'
import { getShortUrlController } from '../controllers/getUrlController'

const urlRoutes = Router()

urlRoutes.post('/shorten', authenticateUser, createShortUrlController)
urlRoutes.get('/', authenticateUser, getShortUrlController)

export default urlRoutes
