import React, { useState } from 'react'
import { ImSpinner3 } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [password, setPassword] = useState('')
  const [cPasswordVisible, setCPasswordVisible] = useState(false)
  const [comfirmPassword, setComfimPassword] = useState('')

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleCPasswordChange = (e) => {
    setComfimPassword(e.target.value)
  }

  const toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cPasswordVisible)
  }

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    const response = axios
      .post('https://cms.ourcarediary.com/api/register', {
        name,
        email,
        password,
        c_password: comfirmPassword,
      })
      .then(function (response) {
        toast.success('successfully Register !')
        setTimeout(() => navigate('/auth/login'), 2000)
      })
      .catch((error) => {
        toast.error('Something Wrong !')
      })
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you have not account, easily register
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <input
              className="p-2 rounded-xl border mt-8"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="p-2 rounded-xl border mt-2"
              id="email"
              type="text"
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
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                id="comfirm_password"
                type={cPasswordVisible ? 'text' : 'password'}
                name="comfirm_password"
                placeholder="Confirm Password"
                value={comfirmPassword}
                onChange={handleCPasswordChange}
                required
              />
              <button
                className="absolute top-2 right-3"
                type="button"
                onClick={toggleCPasswordVisibility}
              >
                <i
                  className={`fa-solid fa-${
                    cPasswordVisible ? 'eye-slash' : 'eye'
                  }`}
                ></i>
              </button>
            </div>
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Register
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>

            <Link
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              to="/auth/login"
            >
              {' '}
              Login
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://st3.depositphotos.com/32466374/36465/v/450/depositphotos_364657460-stock-illustration-medical-board-clip-doctor-hold.jpg"
          />
        </div>
      </div>
      <ToastContainer position="top-right" />
    </section>
  )
}

export default RegisterForm
