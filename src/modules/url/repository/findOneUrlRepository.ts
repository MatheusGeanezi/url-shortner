import { UrlModel } from '../models/url'

export const getUrlByShortUrl = async (filter: object) => {
  const url = await UrlModel.findOne(filter)
  return url
}
