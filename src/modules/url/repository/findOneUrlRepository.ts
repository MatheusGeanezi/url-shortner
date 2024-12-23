import { IUrlAttributes, UrlModel } from '../models/url'

export const getUrlByShortUrl = async (
  filter: object
): Promise<IUrlAttributes | any> => {
  const url = await UrlModel.findOne(filter)
  return url
}
