import { Request, Response } from 'express'
import { getUrlByShortUrlService } from '../services/getUrlByShortUrlService'
export const redirectUrlController = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params
    const longUrl = await getUrlByShortUrlService(shortUrl)
    return res.redirect(longUrl)
  } catch (error: any) {
    if (error.message) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
