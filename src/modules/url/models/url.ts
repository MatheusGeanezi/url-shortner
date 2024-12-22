import { DataTypes, Sequelize } from 'sequelize'
import sequelize from '../../../../config/database'

export const UrlModel = sequelize.define('url', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  longUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clicks: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0
  }
})

export default UrlModel
