import { getUrlByShortUrl } from '../repository/findOneUrlRepository'

export const generateShortUrl = async (): Promise<string> => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let shortUrl = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    shortUrl += characters[randomIndex]
  }

  let existingUrl = await getUrlByShortUrl({ where: { shortUrl } })
  while (existingUrl) {
    shortUrl = ''
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      shortUrl += characters[randomIndex]
    }
    existingUrl = await getUrlByShortUrl({ where: { shortUrl } })
  }

  return shortUrl
}
