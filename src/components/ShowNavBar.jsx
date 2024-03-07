import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ShowNavBar = ({ children }) => {
  const location = useLocation()
  const [showNavBar, setShowNavBar] = useState(false)
  useEffect(() => {
    console.log(location.pathname)
    if (
      location.pathname === '/auth/login' ||
      location.pathname === '/auth/register' ||
      location.pathname === '/'
    ) {
      setShowNavBar(false)
    } else {
      setShowNavBar(true)
    }
  }, [location])
  return <div>{showNavBar && children}</div>
}

export default ShowNavBar
