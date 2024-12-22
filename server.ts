import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import YAML from 'yamljs'
import urlRoutes from './src/modules/url/routes/index'
import sequelize from './config/database'
import swaggerUi from 'swagger-ui-express'
import userRoutes from './src/modules/users/routes'

const app = express()

dotenv.config()
app.use(bodyParser.json())

sequelize
  .sync()
  .then(() => {
    console.log('Tabelas sincronizadas!')
  })
  .catch((error: Error) => {
    console.error('Erro ao sincronizar tabelas:', error.message)
  })

const userDocs = YAML.load('src/modules/users/docs/userDocs.yml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(userDocs))
app.use('/api/url', urlRoutes)
app.use('/api/user', userRoutes)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  console.log('Acesse http://localhost:3001/api-docs para ver a documentação')
})
