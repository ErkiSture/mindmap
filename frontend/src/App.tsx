import './styling/App.css'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom"
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import Project from './pages/Project'
import ProtectedRoute from './components/ProtectedRoute'
import apiFetch from './utils/apiFetch'
import type { User } from './types/user'
import ThemeButton from './components/themeButton'
import useFetch from './hooks/useFetch'

function App() {

  const { 
    data: user, loading: loadingUser, error: userError, setData: setUser, setLoading: setLoadingUser, setError: setUserError 
  } = useFetch<User>('/api/auth/status', { credentials: 'include' })

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
  
  function FullscreenLayout() {
    return (
      <Project/>
    )
  }

  function MainLayout() {
    return (
      <>
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
          <Outlet/>
        </main>

        <footer>

        </footer>
      </>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}> 
            <Route path="/projects" element={<ProtectedRoute user={ user } loadingUser={ loadingUser }><Projects /></ProtectedRoute>}/>
            <Route path="/register" element={<Register setUser={ setUser }/>} />
            <Route path="/login" element={<Login setUser={ setUser }/>} />
          </Route>

        <Route path="/projects/:projectId" element={ <FullscreenLayout></FullscreenLayout> }>

        </Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
