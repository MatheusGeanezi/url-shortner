import { getUrlByShortUrl } from '../repository/findOneUrlRepository'
import { updateRepository } from '../repository/updateUrlRepository'

export const updateUrlService = async (urls: any, user: any) => {
  const { newLongUrl, shortUrl } = urls

  if (!user) {
    throw new Error('Faça o login para acessar a edição!')
  }

  if (!shortUrl) {
    throw new Error('URL encurtada é obrigatória!')
  }

  if (!newLongUrl) {
    throw new Error('Nova URL é obrigatória!')
  }

  const url = await getUrlByShortUrl({ where: { shortUrl } })

  if (!url || url.dataValues?.deletedAt) {
    throw new Error('URL não encontrada ou já deletada')
  }

  await updateRepository({ shortUrl }, { longUrl: newLongUrl })

  return 'URL atualizada com sucesso'
}
