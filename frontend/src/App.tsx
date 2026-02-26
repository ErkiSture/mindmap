import './styling/App.css'
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import Home from './pages/Home'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import Project from './pages/Project'

function App() {

  return (
    <>
      <BrowserRouter>
      <header>
        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/projects"}>Projects</NavLink>
          <NavLink to={"/register"}>Register</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<Project />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
    <footer>

    </footer>
  </>
  )
}

export default App
