import { Router } from 'express'
import { createShortUrlController } from '../controllers/postUrlController'
import { authenticateUser } from '../../../middlewares/authMiddleware'

const urlRoutes = Router()

urlRoutes.post('/shorten', authenticateUser, createShortUrlController)

export default urlRoutes
