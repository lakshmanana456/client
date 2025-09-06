import React, { useEffect, useState } from 'react'
import { auth } from '../config'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [log,setLog]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setLog(true)
                
            }
            else{
                setLog(false)
            }
        },[])
    })

    const handleLogout=()=>{
        auth.signOut()
        navigate("/login")
    }

  return (
    <div className='flex justify-between sticky top-0 z-20 p-2 space-x-2 bg-violet-300 mb-4 px-6 shadow-md'>
      <section className=' flex space-x-2'>

      <Link to={'/dashboard'} className=' px-3 py-2 rounded-md font-bold text-white bg-violet-700 hover:bg-violet-600'>Home</Link>
      </section>

        <section className='flex justify-between space-x-3'>

      <Link to={'/addnewdoc'} className='text-violet-600 px-3 py-2 rounded-md bg-white font-semibold'>Add Document</Link>
      <Link to={'/questionans'} className='bg-white px-3 py-2 rounded-md text-violet-600 font-semibold'>Team Q&A</Link>
      <Link to={'/search'} className='bg-white px-3 py-2 rounded-md text-violet-600 font-semibold'>Search Documents</Link>

        {log ? <Link onClick={handleLogout} className="font-bold bg-violet-700 text-white px-4 py-2 rounded-md hover:bg-violet-600 transition cursor-pointer">
            Logout
          </Link> : <Link to={"/login"} className="font-bold bg-violet-700 text-white px-4 py-2 rounded-md hover:bg-violet-600 transition cursor-pointer">
            Login
          </Link>}

        </section>
    </div>
  )
}

export default Navbar