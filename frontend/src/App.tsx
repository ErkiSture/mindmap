import './styling/App.css'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Home from './pages/Home'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import Project from './pages/Project'
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute'


type User = { username: string }

function App() {
  const [user, setUser] = useState<User | null>(null);

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'Server returned invalid response' };
      }

      if (!res.ok) {
        console.error('Logout failed on server:', res.status, data.message);
        return;
      }

      setUser(null);
      console.log(res.status, data.message);

    } catch (err) {
      console.error('Network or fetch error during logout:', err);
    }
  }

  // Load status(if user is logged in or not)
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/auth/status', { credentials: 'include' });

        let data;
        try {
          data = await res.json();
        } catch {
          data = { message: 'Server returned invalid response' };
        }

        if (!res.ok) {
          console.error('Failed to check status on server:', res.status, data.message);
          return;
        }

        if (data.loggedIn) {
          setUser(data.user);
        }

      } catch (err) {
        console.error('Network or fetch error during status check:', err);
      }
    }
    checkStatus();
  }, []);

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
            {user && (
              <button onClick={ handleLogout }>Logout</button>
            )}
          </nav>
        </header>
      </div >
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProtectedRoute user={ user }><Projects /></ProtectedRoute>}/>
          {/* <Route path='projects/:projectId' element={<ProtectedRoute user={ user }></ProtectedRoute>}> */}
          <Route path="/projects/:projectId" element={<Project />} />
          <Route path="/register" element={<Register />} />
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
