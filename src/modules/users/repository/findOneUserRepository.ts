import UserModel from '../model/userModel'

export const findOneUserRepository = async (filter: object) => {
  const user = await UserModel.findOne(filter)
  return user
}
