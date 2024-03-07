import React from 'react'
import ThemeProvider from './ThemeProvider';

export default function ContextProviders({children}) {
  return (
    <ThemeProvider>
    {children}
    </ThemeProvider>
  )
}
