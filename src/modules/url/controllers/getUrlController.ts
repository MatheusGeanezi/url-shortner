import { Request, Response } from 'express'
import { getShortenUrlService } from '../services/getShortenUrlService'

export const getShortUrlController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user } = res.locals

  try {
    const result = await getShortenUrlService(user?.id)
    res.status(200).json(result)
  } catch (error: any) {
    if (error.message) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
