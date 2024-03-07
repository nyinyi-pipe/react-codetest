import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs'
import { useTheme } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { logoutSuccess } from '../store/slices/UserSlice'

const Navbar = () => {
  const { toggleTheme } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const user = useSelector((state) => state.user.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    Swal.fire({
      title: 'Success',
      text: 'successfully Logout!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(function () {
      dispatch(logoutSuccess())
      navigate('/')
    })
  }
  return (
    <div className="bg-blue-300 z-10 w-full top-0 left-0 h-16 px-6 text-white">
      <nav className="container mx-auto h-full flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-xl font-bold font-roboto">
            Code Test
          </a>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center space-x-4 z-10">
            <li>
              <button
                className="dark:bg-white bg-dark-subtle rounded p-1"
                onClick={toggleTheme}
              >
                <BsFillSunFill className=" text-secondary" size={24} />
              </button>
            </li>
            {user.name == null && (
              <li>
                <Link
                  to={'/auth/register'}
                  className="font-roboto text-white text-md font-semibold"
                >
                  Register
                </Link>
              </li>
            )}
            {user.name != null ? (
              <div className="dropdown inline-block relative">
                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center ">
                  <span className="mr-1 font-roboto uppercase">
                    {user.name}
                  </span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
                  </svg>
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                  <li className="font-roboto">
                    <Link
                      to={'/symptoms'}
                      className=" rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    >
                      Symptoms
                    </Link>
                  </li>
                  <li className="font-roboto">
                    <Link
                      to={'/profile/edit'}
                      className=" rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    >
                      Profile Edit
                    </Link>
                  </li>
                  <li className="">
                    <a
                      className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to={'/auth/login'}
                className="font-roboto text-white text-md font-semibold"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
