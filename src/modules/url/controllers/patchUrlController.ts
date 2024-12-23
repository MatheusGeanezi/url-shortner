import { Request, Response } from 'express'
import { updateUrlService } from '../services/updateUrlService'

export const patchUrlController = async (req: Request, res: Response) => {
  const { user } = res.locals

  try {
    const result = await updateUrlService(req.body, user)
    res.status(201).json(result)
  } catch (error: any) {
    if (error.message) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
