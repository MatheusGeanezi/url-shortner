import { registerUserService } from '../services/registerUserService'
import { Request, Response } from 'express'

export const registerUserController = async (req: Request, res: Response) => {
  try {
    await registerUserService(req.body)
    res.status(201).json({ message: 'Usuário registrado com sucesso!' })
  } catch (error: any) {
    if (error.message) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
