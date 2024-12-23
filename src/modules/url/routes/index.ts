import { Router } from 'express'
import { createShortUrlController } from '../controllers/postUrlController'
import { authenticateUser } from '../../../middlewares/authMiddleware'
import { getShortUrlController } from '../controllers/getUrlController'
import { redirectUrlController } from '../controllers/redirectUrlController'
import { deleteUrlController } from '../controllers/deleteUrlController'
import { patchUrlController } from '../controllers/patchUrlController'

const urlRoutes = Router()

urlRoutes.get('/', authenticateUser, getShortUrlController)
urlRoutes.post('/shorten', authenticateUser, createShortUrlController)
urlRoutes.get('/redirect/:shortUrl', redirectUrlController)
urlRoutes.delete('/:shortUrl', authenticateUser, deleteUrlController)
urlRoutes.patch('/update', authenticateUser, patchUrlController)

export default urlRoutes
