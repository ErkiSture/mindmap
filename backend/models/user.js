import { DataTypes } from "sequelize";


export default (sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}