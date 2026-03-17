import './styling/App.css'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom"
import Home from './pages/Home'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import Project from './pages/Project'
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute'
import apiFetch from './utils/apiFetch'
import type { User } from './types/user'
import ThemeButton from './components/ThemeButton'

function App() {

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Check login status on mount
  useEffect(() => {
    async function checkStatus() {
      const { ok, data } = await apiFetch('/api/auth/status', { credentials: 'include' });
      if (ok) {
        setUser(data.user)
        setLoadingUser(false);
        console.log(data.message);
      } else {
        console.error(data.message);
      }        
    }
    checkStatus();
  }, []);

  // Logout function
  async function handleLogout() {
    const { ok, data } = await apiFetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    if (ok) {
      setUser(null)
      console.log(data.message);
    } else {
      console.error(data.message);
    }  
  }

  return (
    <>
      <BrowserRouter>
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
          </nav>
          <div className='right-side'>
            <ThemeButton></ThemeButton>
            {user && (
              <button onClick={ handleLogout }>Logout</button>
            )}
          </div>
        </header>
      </div >
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProtectedRoute user={ user } loadingUser={ loadingUser }><Projects /></ProtectedRoute>}/>
          <Route path="/projects/:projectId" element={<ProtectedRoute user={ user } loadingUser={ loadingUser }><Project/></ProtectedRoute>}/>
          <Route path="/register" element={<Register setUser={ setUser }/>} />
          <Route path="/login" element={<Login setUser={ setUser }/>} />
        </Routes>
      </main>
    </BrowserRouter>
    <footer>

    </footer>
  </>
  )
}

export default App
