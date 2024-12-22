import { Optional } from 'sequelize'
import { UserModel } from '../model/userModel'

export interface IuserRegister {
  id?: number
  email: string
  password: string
  name: string
}

export const registerUserRepository = async (userData: IuserRegister) => {
  const newUser = await UserModel.create(
    userData as Optional<IuserRegister, 'id'>
  )

  return newUser
}
