import { getUrlByShortUrl } from '../repository/findOneUrlRepository'
import { updateRepository } from '../repository/updateUrlRepository'

export const getUrlByShortUrlService = async (shortUrl: string) => {
  if (!shortUrl) {
    throw new Error('URL encurtada é obrigatoria!')
  }
  const url = await getUrlByShortUrl({ where: { shortUrl } })

  if (!url || url.dataValues.deletedAt) {
    throw new Error('URL não encontrada')
  }

  await updateRepository({ shortUrl }, { clicks: url.clicks + 1 })

  return url.longUrl
}
