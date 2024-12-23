import { Optional } from 'sequelize'
import { UrlModel } from '../models/url'

export interface IurlShortner {
  id?: string
  longUrl: string
  shortUrl: string
  clicks: number
  userId?: string | null
}

export const registerUrlRepository = async (urlData: IurlShortner) => {
  const newUrl = await UrlModel.create(urlData as Optional<IurlShortner, 'id'>)
  return newUrl
}
