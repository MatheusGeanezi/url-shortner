import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('url_shortener', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!')
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error)
  })

export default sequelize
