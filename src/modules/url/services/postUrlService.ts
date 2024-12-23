import {
  IurlShortner,
  registerUrlRepository
} from '../repository/postUrlRepository'
import { generateShortUrl } from './generateShortUrlService'

export const postShortenUrlService = async (longUrl: string, userInfo: any) => {
  if (!longUrl) {
    throw new Error('Url a ser encurtada é obrigatorio.')
  }

  const shortUrl = await generateShortUrl()

  const urlData: IurlShortner = {
    longUrl: longUrl,
    shortUrl: shortUrl,
    clicks: 0
  }

  if (userInfo) {
    urlData.userId = userInfo.id
  }

  const savedUrl = await registerUrlRepository(urlData)

  return savedUrl
}
