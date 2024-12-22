import { hashPassword } from '../../../utils/hashPassword'
import { findOneUserRepository } from '../repository/findOneUserRepository'
import {
  IuserRegister,
  registerUserRepository
} from '../repository/registerUserRepository'

export const registerUserService = async (userData: IuserRegister) => {
  const { email, password, name } = userData

  if (!email || !password || !name) {
    throw new Error('Preencha todos os campos obrigatórios.')
  }

  const existingUser = await findOneUserRepository({
    where: { email: userData.email }
  })

  if (existingUser) {
    throw new Error('Este e-mail já está em uso.')
  }

  const hashedPassword = await hashPassword(userData.password)

  const user = await registerUserRepository({
    email,
    password: hashedPassword,
    name
  })

  return user
}
