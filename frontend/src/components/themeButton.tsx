import { useEffect, useState } from "react"
import '../styling/ThemeButton.css'
import Moon from "../assets/Moon"
import Sun from "../assets/Sun"

export default function ThemeButton() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })

  useEffect(() => {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(theme)
  }, [theme])

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <>
    <button className='theme-button' onClick={toggleTheme}>
      { theme === "light" ? 
      <Sun></Sun>
      :
      <Moon></Moon>
      }
    </button>
    </>
  )
}


