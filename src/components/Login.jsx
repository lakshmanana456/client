import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { auth } from '../config'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [log, setLog] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {


            const validate = await signInWithEmailAndPassword(auth, email, pass)
            // setEmail("")
            // setPass("")
            if (validate) {
                console.log("user login success");

                navigate('/home')
            }
        } catch (err) {
            setError("Email or Password is incorrect")
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLog(true)

                navigate("/home")

            }
            setLog(false)
            
        })
    }, [])


    return (
        <div className="h-screen bg-cover bg-center py-10" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/geometric-gradient-technology-background_23-2149110132.jpg')" }}>

            <form onSubmit={handleLogin} className="flex flex-col backdrop-blur-md mx-auto max-w-md  text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h1 className="font-bold text-3xl text-violet-600 ">Login</h1>
                <p className="text-gray-500 text-sm">Please enter valid details</p>

                {/* Email Input */}
                <input

                    required
                    onChange={(e) => setEmail(e.target.value)}


                    className="border-2 p-2 border-gray-300 rounded-lg outline-none focus:border-violet-500   transition-all duration-200"
                    type="email"
                    placeholder="Email"
                />

                {/* Password Input with Eye Toggle */}
                <div className="relative">
                    <input
                        required
                        onChange={(e) => setPass(e.target.value)}
                        className="w-full border-2 p-2 border-gray-300 rounded-lg outline-none focus:border-violet-500 transition-all duration-200"
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                    />
                    <span
                        onClick={() => setShowPass(!showPass)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-violet-600"
                    >
                        {showPass ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    {error ? <p className='absolute text-red-500 '>{error}</p> : ""}
                </div>

                {/* Login Button */}
                <button
                    className="bg-gradient-to-r from-violet-600 to-purple-500  text-white rounded-lg py-2 px-6 font-semibold hover:bg-violet-700 transition-all duration-200 shadow-md"
                    type='submit'
                >
                    Login
                </button>

                {/* Sign Up Link */}
                <div className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                    <p> Not a user?</p>
                    <Link to="/register" className="text-violet-600 hover:underline">
                        Register
                    </Link>
                </div>

            </form>

        </div>
    )
}

export default Login