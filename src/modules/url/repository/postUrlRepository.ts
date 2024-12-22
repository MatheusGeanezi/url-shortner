import { UrlModel } from '../models/url'

export const saveUrl = async (urlData: {
  longUrl: string
  shortUrl: string
  clicks: number
}) => {
  const newUrl = await UrlModel.create(urlData)
  return newUrl
}
