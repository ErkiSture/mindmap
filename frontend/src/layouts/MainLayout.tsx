import ThemeButton from "../components/themeButton"
import { NavLink, Outlet } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function MainLayout() {

  const context = useContext(UserContext)
  if (!context) throw new Error("Missing provider")
  const { user, logout } = context
  //console.log(user)

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
              <>
                <button onClick={ logout }>Logout</button>
              </>
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