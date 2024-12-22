import { hashPassword } from '../../../utils/hashPassword'
import { findOneUserRepository } from '../repository/findOneUserRepository'
import { registerUserRepository } from '../repository/registerUserRepository'
import { registerUserService } from '../services/registerUserService'

jest.mock('../repository/findOneUserRepository', () => ({
  findOneUserRepository: jest.fn()
}))

jest.mock('../repository/registerUserRepository', () => ({
  registerUserRepository: jest.fn()
}))
jest.mock('../../../utils/hashPassword')

const mockedFindOneUserRepository = findOneUserRepository as jest.Mock
const mockedRegisterUserRepository = registerUserRepository as jest.Mock
const mockedHashPassword = hashPassword as jest.Mock

const makeSut = async (userData: any) => {
  return registerUserService(userData)
}

describe('registerUserService', () => {
  it('should successfully register a new user', async () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'João teste'
    }

    mockedFindOneUserRepository.mockResolvedValue(null)
    mockedHashPassword.mockResolvedValue('hashedPassword123')
    mockedRegisterUserRepository.mockResolvedValue({
      id: '123',
      ...mockUserData
    })

    const result = await makeSut(mockUserData)

    expect(result).toEqual({
      id: '123',
      ...mockUserData
    })
  })

  it('should throw an error if email is already in use', async () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'João teste'
    }

    mockedFindOneUserRepository.mockResolvedValue({ id: '123' })

    await expect(makeSut(mockUserData)).rejects.toThrow(
      'Este e-mail já está em uso.'
    )
  })

  it('should throw an error if required fields are missing', async () => {
    const mockUserData = {
      email: 'test@example.com',
      password: '',
      name: 'João teste'
    }

    await expect(makeSut(mockUserData)).rejects.toThrow(
      'Preencha todos os campos obrigatórios.'
    )
  })
})
