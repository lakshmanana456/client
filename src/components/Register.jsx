import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../config'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Register = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [confirmPass, setConfirmPass] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (pass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }
    try {

      await createUserWithEmailAndPassword(auth, email, pass)
      console.log("user signup successfully");
      navigate('/login')
    }

    catch (err) {
      if (err.code === "auth/email-already-in-use") {

        alert("please login instead of register");
      } else {
        alert("failed to register")
      }
    }
  }
  return (
    <div className="h-screen bg-cover bg-center py-10" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/geometric-gradient-technology-background_23-2149110132.jpg')" }}>

      <form onSubmit={handleRegister} className="flex flex-col mx-auto max-w-md text-center space-y-6 p-8 border border-gray-200  shadow-lg m-6 rounded-md bg-white">
        <h1 className="font-bold text-violet-600 text-3xl">Register New User</h1>

        {/* Email Input */}
        <input
          required
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 p-2 rounded-lg outline-none focus:border-violet-500 border-gray-300 transition-all duration-200"
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
            className="w-full border-2 p-2 border-gray-300 rounded-lg outline-none focus:border-violet-500 transition-all duration-200 "
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
          >
            {showPass ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* confirm password */}
        <div className="relative">
          <input
            type={showConfirmPass ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full border-2 p-2 border-gray-300 rounded-lg outline-none focus:border-violet-500 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
          >
            {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
          </button>

          {error ? <p className="Error absolute text-center items-center text-red-500 text-sm ">{error}</p> : ""}

        </div>

        <span className='text-start text-violet-500'>*Password min 6 chars</span>
        <button
          type='submit'
          className="bg-violet-600 p-2 rounded-md text-white hover:bg-violet-700 transition font-semibold"
        >
          Register
        </button>

        <div className="text-sm text-gray-500 space-x-1 flex items-center justify-center">
          <p> Already a user?</p>
          <a href="./login" className=" text-violet-600 hover:underline">
            Login
          </a>
        </div>


      </form>

    </div>
  )
}

export default Register