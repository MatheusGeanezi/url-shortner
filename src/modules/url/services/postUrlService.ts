import { getUrlByShortUrl } from '../repository/findOneUrlRepository'
import { saveUrl } from '../repository/postUrlRepository'

export const shortenUrl = async (longUrl: string) => {
  const shortUrl = await generateShortUrl(longUrl)

  const urlData = {
    longUrl: longUrl,
    shortUrl: shortUrl,
    clicks: 0
  }

  const savedUrl = await saveUrl(urlData)

  return savedUrl
}

const generateShortUrl = async (longUrl: string): Promise<string> => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let shortUrl = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    shortUrl += characters[randomIndex]
  }

  const baseUrl = 'http://localhost/'

  let existingUrl = await getUrlByShortUrl({ where: { shortUrl } })
  while (existingUrl) {
    shortUrl = ''
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      shortUrl += characters[randomIndex]
    }
    existingUrl = await getUrlByShortUrl({ where: { shortUrl } })
  }

  return baseUrl + shortUrl
}
