import { Sequelize } from "sequelize";
import ProjectModel from "./project.js";
import UserModel from "./user.js"
import NodeModel from "./node.js"

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

const Project = ProjectModel(sequelize);
const User = UserModel(sequelize);
const Node = NodeModel(sequelize);

// DEFINE RELATIONSHIPS
User.hasMany(Project, {foreignKey: {
  allowNull: false
}});
Project.belongsTo(User);

Project.hasMany(Node, {foreignKey: {
  allowNull: false
}})
Node.belongsTo(Project)

await sequelize.sync({ alter: true })
console.log('Database synced')

export { sequelize, Project, User, Node }


