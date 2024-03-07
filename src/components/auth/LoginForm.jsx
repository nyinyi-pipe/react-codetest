import React, { useState } from 'react'
import { ImSpinner3 } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginSuccess, addUser } from '../../store/slices/UserSlice'

const LoginForm = () => {
  const [isPending, setIsPending] = useState(false)
  const [email, setEmail] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    const response = axios
      .post('https://cms.ourcarediary.com/api/login', {
        email,
        password,
      })
      .then(function (response) {
        toast.success('successfully Login !')
        dispatch(loginSuccess())
        dispatch(addUser(response.data.data))
        setTimeout(() => navigate('/symptoms'), 2000)
      })
      .catch((error) => {
        toast.error('Something Wrong Email or Password !')
      })
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button
                className="absolute top-2 right-3"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa-solid fa-${
                    passwordVisible ? 'eye-slash' : 'eye'
                  }`}
                ></i>
              </button>
            </div>
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              {isPending ? <ImSpinner3 className=" animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>

            <Link
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              to="/auth/register"
            >
              {' '}
              Register
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://i.pinimg.com/736x/9d/17/04/9d1704b0f3d9135472efba85d75321be.jpg"
          />
        </div>
      </div>
      <ToastContainer position="top-right" />
    </section>
  )
}

export default LoginForm
