import { Request, Response } from 'express'
import { deleteUrlService } from '../services/deleteUrlService'

export const deleteUrlController = async (req: Request, res: Response) => {
  const { user } = res.locals
  try {
    const { shortUrl } = req.params
    const result = await deleteUrlService(shortUrl, user)
    res.status(201).json(result)
  } catch (error: any) {
    if (error.message) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
