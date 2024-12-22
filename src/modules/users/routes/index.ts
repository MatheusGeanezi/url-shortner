import { Router } from 'express'
import { registerUserController } from '../controllers/registerUserController'
import { loginUserController } from '../controllers/loginUserController'

const userRoutes = Router()

userRoutes.post('/register', registerUserController)
userRoutes.post('/login', loginUserController)

export default userRoutes
