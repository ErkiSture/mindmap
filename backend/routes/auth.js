import express from 'express'
import { User } from '../models/index.js';
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password, passwordConfirm } = req.body;

  // Validate json input
  if (!username || !password || !passwordConfirm) {
    return res.status(400).json({message: 'Username and password required'})
  }

  if (username.length < 3 || username.length > 50) {
    return res.status(400).json({ message: 'Username must be 3–50 chars' });
  }

  if (password.length < 8 || password.length > 50) {
    return res.status(400).json({ message: 'Password must be 8–50 chars' });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if user with the same username already exists
  const existingUser = await User.findOne({ where: { username }});
  if (existingUser) {
    return res.status(409).json({message: 'User with that username already exists'})
  }

  // Create and login new user
  const hashed_password = await bcrypt.hash(password, 10)
  const user = await User.create({username: username, password: hashed_password});
  req.session.user = { username: user.username };
  res.status(201).json({message: 'User created succesfully'});
  }
);


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Validate json input
  if (!username || !password) {
    return res.status(400).json({message: 'Username and password required'});
  }
  
  const user = await User.findOne({ where: { username }});
  if (!user) {
    return res.status(400).json({message: 'Wrong username or password'});
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({message: 'Wrong username or password'});
  }

  req.session.user = { username: user.username };
  res.json({message: 'User successfully logged in'});
  }
);


router.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Failed to destroy session: ', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    // Only send response after session is destroyed
    res.clearCookie('connect.sid'); // optional: remove the cookie
    return res.json({ message: 'Logged out successfully' });
  });
});


router.get('/status', (req, res) => {
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user, message: "Login status checked: logged in" });
  } else {
    return res.json({ loggedIn: false , message: "Login status checked: not logged in"});
  }
});


export function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'Must be logged in'})
  }
}




export default router

// curl -X POST http://localhost:4000/unregister \
//   -H "Content-Type: application/json" \
//   -d '{"username":"testuser","password":"password123"}'