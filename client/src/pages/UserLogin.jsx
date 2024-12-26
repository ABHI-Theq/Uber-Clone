import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import toast from 'react-hot-toast';

function UserLogin() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [userData,setUserData]=useState({})
  const {user,setUser}=useContext(UserDataContext)
  const navigate=useNavigate();

  async function submitHandler(e){
    e.preventDefault();
    const newUser={
      email:email,
      password:password
    }

 try{   const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,newUser)
    if(response.status===200){
      const data=response.data
      setUser(data.user)
      navigate('/home')
      // localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('token',data.token)
      toast.success('Login Successfull')
    }
}catch(e){
  toast.error(e.message)
}

    setEmail('')
    setPassword('')
    // console.log(userData);
    
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
               <p className='text-center'>New here?<Link to='/signup' className='underline text-md text-blue-600 font-semibold'>Create New Account</Link></p>
       </form>
      </div>
      <div>
        <Link
        to='/captain-login'
                     className='flex items-center justify-center  bg-[#10b461] text-white font-semibold rounded-lg  px-4 py-2 border w-full text-lg placeholder:text-base'
        >Sign in As Captain</Link>
      </div>
      
    </div>
  )
}

export default UserLogin