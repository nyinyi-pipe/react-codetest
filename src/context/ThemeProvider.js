import React, { createContext, useEffect } from 'react'

export const ThemeContext = createContext()

const darkTheme = 'dark'
const defaultTheme = 'light'

export default function ThemeProvider({children}) {
    const toggleTheme = () => {
        const oldTheme = getTheme()
        const newTheme = oldTheme === defaultTheme ? darkTheme:defaultTheme
        updateTheme(oldTheme,newTheme)
    };
    useEffect(()=>{
        const theme = getTheme()
        if(!theme) updateTheme(darkTheme,defaultTheme)
        else updateTheme(defaultTheme,theme)
    })
  return (
    <ThemeContext.Provider value={{toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

const getTheme = () => localStorage.getItem("theme")

const updateTheme = (defaultTheme,theme) =>{
    document.documentElement.classList.remove(defaultTheme)
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme",theme)
}