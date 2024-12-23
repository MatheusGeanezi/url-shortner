import { getAllUrlByUserRepository } from '../repository/findAllUrlByUserRepository'
import { getShortenUrlService } from '../services/getShortenUrlService'

jest.mock('../repository/findAllUrlByUserRepository', () => ({
  getAllUrlByUserRepository: jest.fn()
}))

const mockedGetAllUrlByUserRepository = getAllUrlByUserRepository as jest.Mock

const makeSut = async (userId: string) => {
  return getShortenUrlService(userId)
}

describe('getShortenUrlService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return URLs user auth', async () => {
    mockedGetAllUrlByUserRepository.mockResolvedValue([
      { id: 'url1', shortUrl: 'http://short.ly/1', clicks: 10 },
      { id: 'url2', shortUrl: 'http://short.ly/2', clicks: 5 }
    ])

    const result = await makeSut('123')

    expect(result).toEqual([
      { id: 'url1', shortUrl: 'http://short.ly/1', clicks: 10 },
      { id: 'url2', shortUrl: 'http://short.ly/2', clicks: 5 }
    ])
  })

  it('should throw error if userId not send', async () => {
    await expect(makeSut('')).rejects.toThrow(
      'Faça o login para acessar a listagem!'
    )
  })

  it('should return empty array if not exists data', async () => {
    mockedGetAllUrlByUserRepository.mockResolvedValue([])

    const result = await makeSut('123')

    expect(result).toEqual([])
  })
})
