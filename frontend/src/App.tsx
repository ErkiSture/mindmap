import './styling/App.css'
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import Home from './pages/Home'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import Project from './pages/Project'
import { useState, useEffect } from 'react';

type User = { username: string }

function App() {

  function handleLogout() {
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include'}).then(() => {setUser(null)})
  } 

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/auth/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) setUser(data.user);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
      {/* <h2>{user? user.username : 'Guest'}</h2> */}
      <div className='header-wrapper'>
        <header>
          <nav>
            <NavLink to={"/"}>Home</NavLink>
            {user && (
              <NavLink to={"/projects"}>Projects</NavLink>
            )}
            {!user && (
              <>
                <NavLink to={"/register"}>Register</NavLink>
                <NavLink to={"/login"}>Login</NavLink>
              </>
            )}
            {user && (
              <button onClick={handleLogout}>Logout</button>
            )}
          </nav>
        </header>
      </div >
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<Project />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
        </Routes>
      </main>
    </BrowserRouter>
    <footer>

    </footer>
  </>
  )
}

export default App
