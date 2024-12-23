import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET_KEY = process.env.JWT_SECRET
if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY não está definido nas variáveis de ambiente')
}

interface JwtPayload {
  userId: string
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1]
  res.locals.userAuth = false

  if (!token) {
    return next()
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload
    res.locals.userAuth = true
    res.locals.user = decoded

    return next()
  } catch (error) {
    return next()
  }
}
