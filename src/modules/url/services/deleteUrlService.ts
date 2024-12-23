import { getUrlByShortUrl } from '../repository/findOneUrlRepository'
import { updateRepository } from '../repository/updateUrlRepository'

export const deleteUrlService = async (shortUrl: string, user: any) => {
  if (!shortUrl) {
    throw new Error('URL encurtada é obrigatória!')
  }

  if (!user) {
    throw new Error('Faça o login para acessar a listagem!')
  }

  const url = await getUrlByShortUrl({ where: { shortUrl } })

  if (!url || url.dataValues?.deletedAt) {
    throw new Error('URL não encontrada ou já deletada')
  }

  if (url.userId !== user.id) {
    throw new Error('Você não tem permissão para deletar essa URL')
  }

  await updateRepository({ shortUrl }, { deletedAt: new Date() })

  return 'URL deletada com sucesso'
}
