import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { CaptainContextUse } from '../context/CaptainContext';
function CaptainLogin() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [captainData,setCaptainData]=useState({})

  const navigate=useNavigate()
  const {captain,setCaptain}=CaptainContextUse()

  async function submitHandler(e){
    e.preventDefault();
    const newCap={
      email:email,
      password:password
    }
    const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,newCap)

    if(res.status===200){
      const data=res.data;
      setCaptain(data.captain)
    // console.log(JSON.parse(localStorage.getItem('captain')).fullName);
      
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    // console.log(captainData);
    
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
       
       <form onSubmit={submitHandler} action="">
       <h3 className='text-lg font-medium mb-2'>What's your email</h3>
       <input type="email"
       value={email}
       onChange={(e)=>{setEmail(e.target.value)}}
       className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
       required
        placeholder='email@example.com'
         />
 
       <h3 className='text-lg font-medium mb-2'>Enter password</h3>
       <input type="text"
        required
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        className='bg-[#eeeeee] rounded px-4 mb-7 py-2 border w-full text-lg placeholder:text-base' 
         placeholder='password'
         />
 
       <button
       type='submit'
             className='bg-[#111] mb-5 text-white font-semibold rounded-lg  px-4 py-2 border w-full text-lg placeholder:text-base' 
       >Login</button>
               <p className='text-center'>Join a fleet?<Link to='/captain-signup' className='underline text-md text-blue-600 font-semibold'>Register as a Captain</Link></p>
       </form>
      </div>
      <div>
        <Link
        to='/login'
                     className='flex items-center justify-center  bg-[#d5622d] text-white font-semibold rounded-lg  px-4 py-2 border w-full text-lg placeholder:text-base'
        >Sign in As User</Link>
      </div>
      
    </div>
  )
}

export default CaptainLogin