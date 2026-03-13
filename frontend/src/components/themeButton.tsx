import { useState } from "react"
import '../styling/ThemeButton.css'
import Moon from "../assets/Moon"
import Sun from "../assets/Sun"

export default function ThemeButton() {
  const [theme, setTheme] = useState("light")

  function toggleTheme() {
    const body = document.body

    if (theme === "dark") {
      body.classList.remove("dark")
      body.classList.add("light")
      setTheme("light")
    } else {
      body.classList.remove("light")
      body.classList.add("dark")
      setTheme("dark")
    }
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


