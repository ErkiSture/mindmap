import { NavLink, Outlet } from "react-router-dom"
import ThemeButton from "../components/themeButton"


export default function MainLayout() {
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