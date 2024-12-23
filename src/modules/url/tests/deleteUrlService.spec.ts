import { getUrlByShortUrl } from '../repository/findOneUrlRepository'
import { updateRepository } from '../repository/updateUrlRepository'
import { deleteUrlService } from '../services/deleteUrlService'

jest.mock('../repository/findOneUrlRepository', () => ({
  getUrlByShortUrl: jest.fn()
}))

jest.mock('../repository/updateUrlRepository', () => ({
  updateRepository: jest.fn()
}))

const mockedGetUrlByShortUrl = getUrlByShortUrl as jest.Mock
const mockedUpdateRepository = updateRepository as jest.Mock

const makeSut = async (shortUrl: string, user: any) => {
  return await deleteUrlService(shortUrl, user)
}

describe('deleteUrlService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if shortUrl is not provided', async () => {
    const user = { id: 1 }

    await expect(deleteUrlService('', user)).rejects.toThrow(
      'URL encurtada é obrigatória!'
    )
  })

  it('should throw an error if user is not authenticated', async () => {
    const user = null

    await expect(deleteUrlService('exYJ1o', user)).rejects.toThrow(
      'Faça o login para acessar a listagem!'
    )
  })

  it('should throw an error if URL does not exist or is already deleted', async () => {
    const user = { id: 1 }

    const mockUrl = null
    mockedGetUrlByShortUrl.mockResolvedValue(mockUrl)

    await expect(deleteUrlService('exYJ1o', user)).rejects.toThrow(
      'URL não encontrada ou já deletada'
    )
  })

  it('should throw an error if the user does not have permission to delete the URL', async () => {
    const user = { id: 1 }

    const mockUrl = {
      dataValues: {
        deletedAt: null,
        userId: 2
      }
    }
    mockedGetUrlByShortUrl.mockResolvedValue(mockUrl)

    await expect(deleteUrlService('exYJ1o', user)).rejects.toThrow(
      'Você não tem permissão para deletar essa URL'
    )
  })
})
