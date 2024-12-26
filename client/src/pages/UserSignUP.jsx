import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
function UserSignUP() {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [userData,setUserData]=useState({})
  const {user,setUser}=useContext(UserDataContext);

  const navigate=useNavigate()
  const submitHandler= async (e)=>{
    if(!firstName || !lastName || !email || !password){
      toast.error("please fill all the fields")
    }
    e.preventDefault();
    const newUser={
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password
    }
try{   const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)

    if(response.status===201){
      const data=response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/')
      toast.success('sign-up successfull')
    }}catch(e){
      toast.error(e.message)
    }
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
       
       <form onSubmit={submitHandler} action="">
        <h3 className='text-lg font-semibold mb-2'>What's your name</h3>
        <div className='flex gap-2'>
        <input type="text"
       value={firstName}
       onChange={(e)=>{setFirstName(e.target.value)}}
       className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' 
       required
        placeholder='First name'
         />
               <input type="text"
       value={lastName}
       onChange={(e)=>{setLastName(e.target.value)}}
       className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' 
       required
        placeholder='Last name'
         />
 
 
        </div>



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
       >Sign up</button>
               <p className='text-center'>Already have an account?<Link to='/login' className='underline text-md text-blue-600 font-semibold'>Login here</Link></p>
       </form>
      </div>
      <div>
        <p className='text-xs'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati nihil officiis, quaerat.
        </p>
      </div>
      
    </div>
  )
}

export default UserSignUP