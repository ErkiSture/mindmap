import { Sequelize } from "sequelize";
import ProjectModel from "./project.js";
import UserModel from "./user.js"
import NodeModel from "./node.js"
//import EdgeModel from "./edge.js"


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

const Project = ProjectModel(sequelize);
const User = UserModel(sequelize);
const Node = NodeModel(sequelize);

User.hasMany(Project, {foreignKey: 'userId'});
Project.belongsTo(User, {foreignKey: 'userId'});

await sequelize.sync({ alter: true })
console.log('Database synced')

export { sequelize, Project, User, Node }


