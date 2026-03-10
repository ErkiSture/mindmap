import express from 'express';
import { isAuthenticated } from './auth.js';
import { User, Project } from '../models/index.js';

const router = express.Router();


// Create new project
router.post('/create', async (req, res) => {
    const { name } = req.body;
    const username = req.session.user.username;
    const user = await User.findOne({ where: { username: username }});
    const project = await user.createProject({ name: name });
    return res.status(200).json({ message: 'Project created successfully', project: project});
  }
)

//Get specific project of user
router.get("/get:projectId", isAuthenticated, async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findOne({ where: { id: projectId }});
  return res.status(200).json({ message: "Fetched project successfully", project: project})
})


// Get all projects of user
router.get('/get', isAuthenticated, async (req, res) => {
  const username = req.session.user.username;
  const user = await User.findOne({ where: { username: username }});

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let projects = await Project.findAll({ where: { userId: user.id }});
  return res.status(200).json({ message: 'Fetched all projects successfully', projects: projects });
})


export default router;