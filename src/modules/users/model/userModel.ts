import { DataTypes } from 'sequelize'
import sequelize from '../../../../config/database'

export interface IUserAttributes {
  id: number
  email: string
  password: string
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export const UserModel = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    timestamps: true,
    paranoid: true
  }
)

export default UserModel
