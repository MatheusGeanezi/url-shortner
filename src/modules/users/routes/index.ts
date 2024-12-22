import { Router } from 'express'
import { registerUserController } from '../controllers/registerUserController'

const userRoutes = Router()

userRoutes.post('/register', registerUserController)

export default userRoutes
