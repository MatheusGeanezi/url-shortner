import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret) {
  throw new Error('JWT secret is missing from the environment variables')
}

export const authenticateToken = (
  req: {
    headers: { [x: string]: string }
    user: string | jwt.JwtPayload | undefined
  },
  res: {
    status: (arg0: number) => { json: (arg0: { message: string }) => void }
  },
  next: () => void
) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' })
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' })
    }

    req.user = user
    next()
  })
}
