import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainContextUse } from '../context/CaptainContext.jsx';
import toast from 'react-hot-toast'
import axios from 'axios'


function CaptainSignup() {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [vehicleColor,setVehicleColor]=useState('')
  const [vehicleCapacity,setVehicleCapacity]=useState('')
  const [vehicleType,setVehicleType]=useState('')
  const [vehiclePlate,setVehiclePlate]=useState('')
  const [userData,setUserData]=useState({})
  const navigate=useNavigate()

  const {captain,setCaptain}=CaptainContextUse()

  const submitHandler=async (e)=>{
    e.preventDefault();
    
    const newCap={
        firstName:firstName,
        lastName:lastName,
      email:email,
      password:password,
      
        color:vehicleColor,
        capacity:vehicleCapacity,
        type:vehicleType,
        plate:vehiclePlate
        }
    
    const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,newCap)
    if(res.status===201){
      const data=res.data;
      setCaptain(data.captain)
      localStorage.setItem('captain',JSON.stringify(data.captain))
      localStorage.setItem('token',data.token)
      toast.success('Captain Created Successfully')
      navigate('/captain-home')
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehicleType('')
    setVehiclePlate('')
    
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
 
 <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-sm'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-sm'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-sm'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border text-sm placeholder:text-sm'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
       <button
       type='submit'
             className='bg-[#111] mb-5 text-white font-semibold rounded-lg  px-4 py-2 border w-full text-lg placeholder:text-base' 
       >Sign up as Captain</button>
               <p className='text-center'>Already have an account?<Link to='/login' className='underline text-md text-blue-600 font-semibold'>Login here</Link></p>
       </form>
      </div>
      <div>
        <p className='text-xs'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati nihil officiis, quaerat.
        </p>
      </div>
      
    </div>)
}

export default CaptainSignup