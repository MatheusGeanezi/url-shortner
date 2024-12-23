import { UrlModel } from '../models/url'

interface IUrlFilter {
  where: any
}

export const getAllUrlByUserRepository = async (filter: IUrlFilter) => {
  const url = await UrlModel.findAll(filter)
  return url
}
