import { Request, Response } from 'express'
import { shortenUrl } from '../services/postUrlService'

export const createShortUrl = async (req: Request, res: Response) => {
  const { longUrl, shortUrl } = req.body
  try {
    const result = await shortenUrl(longUrl)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar URL' })
  }
}
