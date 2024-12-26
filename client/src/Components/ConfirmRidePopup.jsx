import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ConfirmRidePopup({scrpp,srpp,ride}) {
    const [otp,setOtp] =useState('')
    const navigate=useNavigate()

    const submitHandler=async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
            {
            params:{ rideId:ride._id,otp:otp}
        ,
            
                headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(res.data);

        if(res.data.error){
            throw new Error(res.data.error.message)
        }
        
        if(res.status===200){
            toast.success('ride started')
            srpp(false)
            scrpp(false)
            navigate('/captain-riding',{
                state:{
                    ride:ride}
            })
        }
    }catch(error){
        console.log(error);
        toast.error(error.message)
        
    }
}
  return (
    <div>
    <h5 className='text-center'
    onClick={()=>{
        srpp(false);
    }}
    ><i
    className="  active:bg-gray-200 rounded-xl block w-full text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
    <h3 className='text-xl font-bold '>Confirm Your Ride To Start</h3>
    <div className='my-4 p-2 flex items-center justify-between  w-full bg-yellow-400 border-gray-600 border-2 rounded-xl'>
        <div className=' flex items-center gap-2'>
            <img className="w-12 h-12 rounded-full object-cover" src="https://www.shutterstock.com/image-photo/handsome-indonesian-southeast-asian-man-260nw-2476654675.jpg" alt="" />
            <h3 className='text-lg font-medium'>{ride?.userId.fullName.firstName+' '+ride?.userId.fullName.lastName}</h3>
        </div>
        <h5>2.2Km</h5>
    </div>

    <div className="flex flex-col gap-2 justify-between items-center ">
    <div className='w-full'>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div className='w-[80%]' >
                    <h3 className='text-xl font-bold'>562/11-A</h3>
                    <p className='text-base text-gray-600  font-normal overflow-x-scroll text-nowrap scrollbar-thin  h-15'>{ride?.pickup}</p>
                    
                </div>
                
            </div>
            <hr className='w-[77%]  border-1 absolute right-4'/>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div className='w-[80%]' >
                    <h3 className='text-xl font-bold'>562/11-A</h3>
                    <p className='text-base text-gray-600  font-normal overflow-x-scroll text-nowrap scrollbar-thin  h-15'>{ride?.destination}</p>
                </div>
            </div>
            <hr className='w-[77%] absolute border-1 right-4'/>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-bank-card-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div className='w-[80%]'>
                    <h3 className='text-xl font-bold'>₹{ride?.fare}</h3>
                    <p className='text-base text-gray-600  font-normal'>Cash Cash</p>
                </div>
            </div>
        </div>
   <form
   className='flex flex-col gap-3 w-full py-10'
    onSubmit={(e)=>{
    submitHandler(e)
   }}>
    <input 
    value={otp}
    onChange={(e)=>{
        setOtp(e.target.value)
    }}
                 className='font-mono bg-[#eeeeee] px-6 py-4 text-base rounded-lg w-full mb-2' 
    type="text" placeholder='Enter OTP' required />
   <button 
    className=' text-center w-full active:bg-green-700 bg-green-500 text-white font-semibold p-2 rounded-lg text-lg' type="submit">Confirm</button>
    <button
    // onClick={()=>{
    //     scrpp(false)
    //     srpp(false)
    // }}
    className='w-full active:bg-red-4 00 bg-red-500 text-white font-semibold p-2 rounded-lg text-lg'>Cancel</button>
   
    </form> 
   </div>
    
</div>
  )
}

export default ConfirmRidePopup