import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Symptom = () => {
  const [symptomLists, setSymptomLists] = useState([])
  const user = useSelector((state) => state.user)
  const config = {
    headers: { Authorization: `Bearer ${user.user.token.accessToken}` },
  }

  useEffect(() => {
    console.log('suc')
    console.log(user.login)
    const getSymptoms = async () => {
      try {
        const res = await axios.get(
          'https://cms.ourcarediary.com/api/symptoms',
          config
        )
        console.log(res.data)
        setSymptomLists(res.data.data)
      } catch (err) {}
    }
    getSymptoms()
  }, [])
  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1.2 },
  }
  return (
    <>
      {user.login == false ? (
        <div className=" font-bold text-xl flex justify-center items-center">
          401 Unauthorized !
        </div>
      ) : (
        <div className="md:fixed pt-7 inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 space-x-0 lg:space-x-20 dark:text-white text-primary max-w-screen-lg mx-auto items-center">
            {symptomLists.map((symptom) => (
              <motion.div
                className="dark:bg-secondary bg-gray-300 p-6 space-y-6 w-60 md:w-80 flex flex-col hover:scale-105 rounded-2xl font-poppins"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.7 }}
                key={symptom.id}
              >
                <h1 className=" dark:text-white text-primary font-bold text-center text-lg">
                  Name : {symptom.name}
                </h1>
                <h1 className=" dark:text-white text-primary font-bold text-center text-lg">
                  Gender : {symptom.gender}
                </h1>
                <h1 className=" dark:text-white text-primary font-bold text-center text-lg">
                  Status : {symptom.status}
                </h1>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Symptom
