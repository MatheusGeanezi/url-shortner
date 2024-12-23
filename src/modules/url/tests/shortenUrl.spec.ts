import { postShortenUrlService } from '../../url/services/postUrlService'
import { registerUrlRepository } from '../repository/postUrlRepository'
import { generateShortUrl } from '../services/generateShortUrlService'

jest.mock('../services/generateShortUrlService', () => ({
  generateShortUrl: jest.fn()
}))

jest.mock('../repository/postUrlRepository', () => ({
  registerUrlRepository: jest.fn()
}))

const mockedGenerateShortUrl = generateShortUrl as jest.Mock
const mockedRegisterUrlRepository = registerUrlRepository as jest.Mock

const makeSut = async (longUrl: string, userInfo: any) => {
  return await postShortenUrlService(longUrl, userInfo)
}

describe('shortenUrl', () => {
  it('should throw an error if longUrl is not provided', async () => {
    await expect(makeSut('', null)).rejects.toThrow(
      'Url a ser encurtada é obrigatorio.'
    )
  })

  it('should call generateShortUrl and registerUrlRepository with valid data', async () => {
    const mockedShortUrl = 'short.ly/12345'
    mockedGenerateShortUrl.mockResolvedValue(mockedShortUrl)

    const mockUrlData = {
      longUrl: 'http://longurl.com',
      shortUrl: mockedShortUrl,
      clicks: 0,
      userId: 'user123'
    }
    mockedRegisterUrlRepository.mockResolvedValue(mockUrlData)
  })

  it('should not include userId if userInfo is not provided', async () => {
    const mockedShortUrl = 'short.ly/12345'
    mockedGenerateShortUrl.mockResolvedValue(mockedShortUrl)

    const mockUrlData = {
      longUrl: 'http://longurl.com',
      shortUrl: mockedShortUrl,
      clicks: 0
    }
    mockedRegisterUrlRepository.mockResolvedValue(mockUrlData)

    await makeSut('http://longurl.com', null)
  })
})
