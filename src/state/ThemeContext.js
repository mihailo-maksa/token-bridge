import React, { useState } from 'react'

export const ThemeContext = React.createContext({
  isDarkMode: false,
  switchMode: () => {},
})

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('Mode')),
  )

  const switchMode = () => {
    if (JSON.parse(localStorage.getItem('Mode')) === false) {
      setDarkMode(true)
      localStorage.setItem('Mode', JSON.stringify(true))
    } else {
      setDarkMode(false)
      localStorage.setItem('Mode', JSON.stringify(false))
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: darkMode,
        switchMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
