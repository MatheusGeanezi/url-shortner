import { Request, Response } from 'express'
import { postShortenUrlService } from '../services/postUrlService'

export const createShortUrlController = async (req: Request, res: Response) => {
  const { user } = res.locals
  const { longUrl } = req.body

  try {
    const result = await postShortenUrlService(longUrl, user)
    res.status(201).json(result)
  } catch (error: any) {
    if (error.message) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
