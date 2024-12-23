import { getAllUrlByUserRepository } from '../repository/findAllUrlByUserRepository'

export const getShortenUrlService = async (userId: string) => {
  if (!userId) {
    throw new Error('Faça o login para acessar a listagem!')
  }
  const urls = await getAllUrlByUserRepository({
    where: { userId, deletedAt: null }
  })
  return urls
}
