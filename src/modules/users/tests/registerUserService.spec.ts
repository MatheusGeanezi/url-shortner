import sequelize from '../../../../config/database'
import { hashPassword } from '../../../utils/hashPassword'
import { findOneUserRepository } from '../repository/findOneUserRepository'
import { registerUserRepository } from '../repository/registerUserRepository'
import { registerUserService } from '../services/registerUserService'

jest.mock('../repository/findOneUserRepository')
jest.mock('../repository/registerUserRepository')
jest.mock('../../../utils/hashPassword')

const mockedFindOneUserRepository = findOneUserRepository as jest.Mock
const mockedRegisterUserRepository = registerUserRepository as jest.Mock
const mockedHashPassword = hashPassword as jest.Mock

// beforeAll(async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Conexão com o banco de dados bem-sucedida!')
//   } catch (error) {
//     console.error('Não foi possível conectar ao banco de dados:', error)
//   }
// })

// afterAll(async () => {
//   await sequelize.close()
// })

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
