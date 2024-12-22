import { loginUserService } from '../services/loginUserService'
import { findOneUserRepository } from '../repository/findOneUserRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

jest.mock('../repository/findOneUserRepository', () => ({
  findOneUserRepository: jest.fn()
}))
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

const mockedFindOneUserRepository = findOneUserRepository as jest.Mock
const mockedBcryptCompare = bcrypt.compare as jest.Mock
const mockedJwtSign = jwt.sign as jest.Mock

const makeSut = async (userData: { email: string; password: string }) => {
  return loginUserService(userData)
}

describe('loginUserService', () => {
  it('should successfully log in a user and return a token', async () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'hashedPassword123',
      id: '123'
    }

    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    }

    mockedFindOneUserRepository.mockResolvedValue(mockUserData)
    mockedBcryptCompare.mockResolvedValue(true)
    mockedJwtSign.mockReturnValue('mockedToken')
    const result = await makeSut(loginData)
    expect(result).toBe('mockedToken')
  })

  it('should throw an error if email is not found', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    }

    mockedFindOneUserRepository.mockResolvedValue(null)

    await expect(makeSut(loginData)).rejects.toThrow(
      'E-mail ou senha inválidos.'
    )

    expect(mockedFindOneUserRepository).toHaveBeenCalledWith({
      where: { email: loginData.email }
    })
  })

  it('should throw an error if password is invalid', async () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'hashedPassword123',
      id: '123'
    }

    const loginData = {
      email: 'test@example.com',
      password: 'wrongPassword'
    }

    mockedFindOneUserRepository.mockResolvedValue(mockUserData)
    mockedBcryptCompare.mockResolvedValue(false)

    await expect(makeSut(loginData)).rejects.toThrow(
      'E-mail ou senha inválidos.'
    )
  })
})
