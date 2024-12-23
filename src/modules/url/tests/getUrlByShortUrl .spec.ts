import { getUrlByShortUrl } from '../repository/findOneUrlRepository'
import { updateRepository } from '../repository/updateUrlRepository'
import { getUrlByShortUrlService } from '../services/getUrlByShortUrlService'

jest.mock('../repository/findOneUrlRepository', () => ({
  getUrlByShortUrl: jest.fn()
}))

jest.mock('../repository/updateUrlRepository', () => ({
  updateRepository: jest.fn()
}))

const mockedUpdateRepository = updateRepository as jest.Mock
const mockedGetUrlByShortUrl = getUrlByShortUrl as jest.Mock

const makeSut = async (shortUrl: string) => {
  jest.clearAllMocks()
  return getUrlByShortUrlService(shortUrl)
}

describe('getUrlByShortUrlService', () => {
  it('should throw an error if shortUrl is not provided', async () => {
    await expect(makeSut('')).rejects.toThrow('URL encurtada é obrigatoria!')
  })

  it('should throw an error if the URL is not found', async () => {
    mockedGetUrlByShortUrl.mockResolvedValue(null)

    await expect(makeSut('exYJ1o')).rejects.toThrow('URL não encontrada')
  })

  it('should throw an error if the URL is deleted', async () => {
    mockedGetUrlByShortUrl.mockResolvedValue({
      dataValues: { deletedAt: new Date() }
    })

    await expect(makeSut('exYJ1o')).rejects.toThrow('URL não encontrada')
  })
})
