import { DataTypes } from "sequelize";


export default (sequelize) => {
  return sequelize.define('Node', {
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    posX: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    posY: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}