import UserModel, { IUserAttributes } from '../model/userModel'

interface IUserFilter {
  where: any
}

export const findOneUserRepository = async (
  filter: IUserFilter
): Promise<IUserAttributes | any> => {
  const user = await UserModel.findOne(filter)
  return user
}
