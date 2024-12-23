import { getUrlByShortUrl } from '../repository/findOneUrlRepository'
import { updateRepository } from '../repository/updateUrlRepository'
import { updateUrlService } from '../services/updateUrlService'

jest.mock('../repository/findOneUrlRepository', () => ({
  getUrlByShortUrl: jest.fn()
}))

jest.mock('../repository/updateUrlRepository', () => ({
  updateRepository: jest.fn()
}))

const mockedGetUrlByShortUrl = getUrlByShortUrl as jest.Mock
const mockedUpdateRepository = updateRepository as jest.Mock

const makeSut = async (urls: any, user: any) => {
  return await updateUrlService(urls, user)
}

describe('updateUrlService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if user is not authenticated', async () => {
    const urls = { shortUrl: 'short123', newLongUrl: 'https://newlongurl.com' }
    const user = null

    await expect(updateUrlService(urls, user)).rejects.toThrow(
      'Faça o login para acessar a edição!'
    )
  })

  it('should throw an error if shortUrl is not provided', async () => {
    const urls = { shortUrl: '', newLongUrl: 'https://newlongurl.com' }
    const user = { id: 1 }

    await expect(updateUrlService(urls, user)).rejects.toThrow(
      'URL encurtada é obrigatória!'
    )
  })

  it('should throw an error if newLongUrl is not provided', async () => {
    const urls = { shortUrl: 'short123', newLongUrl: '' }
    const user = { id: 1 }

    await expect(updateUrlService(urls, user)).rejects.toThrow(
      'Nova URL é obrigatória!'
    )
  })

  it('should throw an error if URL is not found or already deleted', async () => {
    const urls = { shortUrl: 'short123', newLongUrl: 'https://newlongurl.com' }
    const user = { id: 1 }

    mockedGetUrlByShortUrl.mockResolvedValue(null)

    await expect(updateUrlService(urls, user)).rejects.toThrow(
      'URL não encontrada ou já deletada'
    )
  })

  it('should successfully update the URL if valid inputs are provided', async () => {
    const urls = { shortUrl: 'short123', newLongUrl: 'https://newlongurl.com' }
    const user = { id: 1 }

    const mockUrl = {
      dataValues: {
        deletedAt: null,
        shortUrl: 'short123'
      }
    }

    mockedGetUrlByShortUrl.mockResolvedValue(mockUrl)
    mockedUpdateRepository.mockResolvedValue({})

    const result = await makeSut(urls, user)

    expect(result).toBe('URL atualizada com sucesso')
  })
})
