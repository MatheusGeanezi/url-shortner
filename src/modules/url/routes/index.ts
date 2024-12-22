import { Router } from 'express'
import { createShortUrl } from '../controllers/postUrlController'

const urlRoutes = Router()

urlRoutes.post('/shorten', createShortUrl)

// router.get('/shorten', createShortUrl)
// router.get("/:shortId", getOriginalUrl)

export default urlRoutes
