import './styling/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Projects from './pages/Projects'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import apiFetch from './utils/apiFetch'
import type { User } from './types/user'
import useFetch from './hooks/useFetch'
import { UserContext } from './context/UserContext'
import MainLayout from './layouts/MainLayout'
import CanvasLayout from './layouts/CanvasLayout'

function App() {

  const { data: user, loading: loadingUser, setData: setUser } = useFetch<User>('/api/auth/status', { credentials: 'include' })

  async function logout() {
    const { ok, data } = await apiFetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    if (ok) {
      setUser(null)
      console.log(data.message);
    } else {
      console.error(data.message);
    }  
  }
  
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}> 
            <Route path="/projects" element={<ProtectedRoute user={ user } loadingUser={ loadingUser }><Projects /></ProtectedRoute>}/>
            <Route path="/register" element={<Register setUser={ setUser }/>} />
            <Route path="/login" element={<Login setUser={ setUser }/>} />
          </Route>

        <Route path="/projects/:projectId" element={ <CanvasLayout></CanvasLayout> }>

        </Route>
      </Routes>
    </BrowserRouter>
  </UserContext.Provider>
  )
}

export default App
