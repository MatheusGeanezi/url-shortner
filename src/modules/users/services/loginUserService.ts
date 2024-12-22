import { findOneUserRepository } from '../repository/findOneUserRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUserService = async (userData: {
  email: string
  password: string
}) => {
  const { email, password } = userData

  const user = await findOneUserRepository({ where: { email } })
  if (!user) {
    throw new Error('E-mail ou senha inválidos.')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('E-mail ou senha inválidos.')
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  )

  return token
}
