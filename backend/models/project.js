import { DataTypes } from 'sequelize';


export default (sequelize) => {
  return sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};