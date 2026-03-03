import express from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects.js';
import authRouter from './routes/auth.js'
import session from 'express-session'
import { isAuthenticated } from "./routes/auth.js";
import csurf from 'csurf';

const SECRET = "supersecretkey";

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    secure: false, 
    sameSite: "lax" 
  }
}))

app.use(express.urlencoded({ extended: true }));

app.use('/api/projects', projectsRouter);
app.use('/api/auth', authRouter)

app.get('/api/test', isAuthenticated, (req, res) => {
  res.json({ message: 'Backend working'})
});


app.listen(4000, () => {
  console.log('Server running on port 4000');
});