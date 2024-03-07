import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux'
import { addUserP, addUser } from '../store/slices/UserSlice'
import { useForm } from 'react-hook-form'

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [user_id, setUserId] = useState('')
  const [patient_id, setPatientId] = useState('')
  const [avatar, setAvatar] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [bloodType, setBloodType] = useState('')


  const fileInputRef = useRef(null)

  const dispatch = useDispatch()

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const user = useSelector((state) => state.user)
  const patient = useSelector((state) => state.patient)
  const config = {
    headers: {
      Authorization: `Bearer ${user.user.token.accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const getProfile = async () => {
    console.log('workkk')

    try {
      const res = await axios.get(
        `https://apitest.lumin.institute/api/patients/${user.user.patient.id}`,
        config
      )
      console.log(res.data.data)
      console.log('ddddd')
      console.log(res.data.data.user.avatar)

      dispatch(addUserP(res.data.data))
      setFirstName(res.data.data.first_name)
      setLastName(res.data.data.last_name)
      setHeight(res.data.data.height)
      setWeight(res.data.data.weight)
      setBloodType(res.data.data.blood_type)
      setGender(res.data.data.gender)
      setAvatar(res.data.data.user.avatar)
    } catch (err) {}
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    console.log('Selected File:', selectedFile)

    const formData = new FormData()
    formData.append('avatar', selectedFile)

    axios
      .post(
        `https://apitest.lumin.institute/api/patients/${patient_id}/avatar`,
        formData,
        config
      )
      .then(function (response) {
        console.log(response.data.data)
        dispatch(addUserP(response.data.data))
        getProfile()
        setAvatar(avatar)
        toast.success('Successfully Updated Patient Profile!')
      })
      .catch((error) => {
        console.error('Error occurred while uploading file:', error)
        toast.error('Something went wrong!')
      })
  }

  useEffect(() => {
    setUserId(user.user.token.token.user_id)
    if (user.user.patient?.id) {
      setPatientId(user.user.patient?.id)

      getProfile()
    }
  }, [])

  const handleOptionChange = (e) => {
    setGender(e.target.value)
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    
      const response = axios
        .post(
          'https://apitest.lumin.institute/api/patients',
          {
            user_id: user_id,
            first_name: firstName,
            last_name: lastName,
            gender,
            height,
            weight,
            blood_type: bloodType,
          },
          config
        )
        .then(function (response) {
          console.log(response.data.data)
          dispatch(addUserP(response.data.data))
          console.log('success')
          toast.success('successfully Created Patient Profile !')
        })
        .catch((error) => {
          toast.error('Something Wrong!')
        })
    
  }

  return (
    <div className="md:fixed md:pt-7 pt-5 px-8 inset-0  dark:bg-primary bg-white -z-10 flex justify-center items-center">
      <div className="bg-gray-100 rounded-2xl  shadow-lg w-full sm:mx-2 lg:w-1/2 p-5 items-center dark:bg-gray-800">
        <h2 className="text-center font-poppins text-slate-500 font-semibold">
          Profile Detial
        </h2>

        <div className="">
          {avatar ? (
            <img
              className="mt-8 h-24 w-24 mx-auto rounded-full ring-4 ring-green-500 sm:flex-shrink-0"
              src={avatar}
              alt="avatar"
            />
          ) : (
            <img
              className="mt-8 h-24 w-24 mx-auto rounded-full ring-4 ring-green-500 sm:flex-shrink-0"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZgpgKWoO6EQcXPuCsJA503nMxb7P9fu2JWw1ofnGmoNg-rUB2X46WMVIUPxnQjzWz-C0&usqp=CAU"
              alt="default"
            />
          )}
          <span
            className="float-right w-10 bg-green-500 text-gray-100 px-2 py-2 rounded-full text-sm transform hover:scale-105 duration-500 cursor-pointer"
            onClick={handleClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <i className="fa-solid fa-pen-to-square flex justify-center"></i>
          </span>
        </div>
        <form onSubmit={handleUpdateProfile}>
          <div className="flex mt-8 flex-wrap md:flex-row md:flex-nowrap gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="text-slate-400">
                First Name
              </label>
              <input
                className="p-2 mt-1 rounded-xl border w-full focus:outline-none"
                type="text"
                name="name"
                placeholder="..."
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              {!firstName.trim() && (
                <p className="text-red-600 dark:text-red-300 text-center text-sm font-semibold">
                  First Name is required
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="text-slate-400">
                Last Name
              </label>
              <input
                className="p-2 mt-1 rounded-xl border w-full focus:outline-none"
                type="text"
                name="name"
                placeholder="..."
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              {!lastName.trim() && (
                <p className="text-red-600 dark:text-red-300 text-center text-sm font-semibold">
                  Last Name is required
                </p>
              )}
            </div>
          </div>
          <div className="flex mt-8 flex-wrap md:flex-row md:flex-nowrap gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="text-slate-400">
                Weight
              </label>
              <input
                className="p-2 mt-1 rounded-xl border w-full focus:outline-none"
                type="text"
                name="weight"
                placeholder="..."
                value={weight}
                required
                onChange={(e) => setWeight(e.target.value)}
              />
              {!weight.trim() && (
                <p className="text-red-600 dark:text-red-300 text-center text-sm font-semibold">
                  Weight is required
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="text-slate-400">
                Height
              </label>
              <input
                className="p-2 mt-1 rounded-xl border w-full focus:outline-none"
                type="text"
                name="height"
                placeholder="..."
                value={height}
                required
                onChange={(e) => setHeight(e.target.value)}
              />
              {!height.trim() && (
                <p className="text-red-600 dark:text-red-300 text-center text-sm font-semibold">
                  Height is required
                </p>
              )}
            </div>
          </div>
          <div className="flex mt-8 flex-wrap md:flex-row md:flex-nowrap gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="name" className="text-slate-400">
                Blood Type
              </label>
              <input
                className="p-2 mt-1 rounded-xl border w-full focus:outline-none"
                type="text"
                name="name"
                placeholder="..."
                value={bloodType}
                required
                onChange={(e) => setBloodType(e.target.value)}
              />
              {!bloodType.trim() && (
                <p className="text-red-600 dark:text-red-300 text-center text-sm font-semibold">
                  Blood Type is required
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 mt-9 flex justify-center gap-5 dark:text-slate-400">
              <label className="font-poppins">
                <input
                  id="male"
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleOptionChange}
                />
                Male
              </label>
              <label className="font-poppins">
                <input
                  id="female"
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={handleOptionChange}
                />
                Female
              </label>
            </div>
          </div>
          <div className="text-center w-full mt-8">
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 px-10 hover:scale-105 duration-300 dark:bg-blue-300 dark:text-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default Profile
