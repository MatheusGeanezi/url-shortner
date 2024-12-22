import { Request, Response } from 'express'
import { loginUserService } from '../services/loginUserService'

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const token = await loginUserService(req.body)
    res
      .status(201)
      .json({ message: 'Usuário logado e autenticado com sucesso!', token })
  } catch (error: any) {
    if (error.message) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
