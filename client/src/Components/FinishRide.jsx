import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
const FinishRide = ({sfrp,ride}) => {
    const navigate=useNavigate()

    const endRide=async()=>{
        try {
            
            const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
                rideId:ride._id
            },{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })

            // console.log(res);
            
            if(res.status===200){
                console.log(res.data);
                sfrp(false)
                toast.success("Ride ended")
                navigate('/captain-home')
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div>
        <h5 className='text-center'
        onClick={()=>{
            sfrp(false);
        }}
        ><i
        className="  active:bg-gray-200 rounded-xl block w-full text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-xl font-bold'>Finish The Ride</ h3>
        <div className='my-4 p-2 flex items-center justify-between  w-full bg-yellow-400 rounded-xl'>
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
                    <p className='text-base text-gray-600  font-normal overflow-x-scroll scrollbar-thin text-nowrap h-15'>{ride?.pickup}</p>
                    
                </div>
                
            </div>
            <hr className=' border-1  right-4'/>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div  className='w-[80%]' >
                    <h3 className='text-xl font-bold'>562/11-A</h3>
                    <p className='text-base text-gray-600  font-normal overflow-x-scroll scrollbar-thin text-nowrap h-15'>{ride?.destination}</p>
                </div>
            </div>
            <hr className=' border-1 right-4'/>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-bank-card-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div  className='w-[80%]' >
                    <h3 className='text-xl font-bold'>₹{ride?.fare}</h3>
                    <p className='text-base text-gray-600  font-normal'>Cash Cash</p>
                </div>
            </div>
        </div>
       <button
       onClick={()=>{
        endRide()
       }}
        className=' text-center text-xl w-full active:bg-green-700 bg-green-500 text-white font-semibold p-2 rounded-lg' type="submit">Finish Ride</button> 
        <p className='text-xs text-red-500 mt-10'>click on finish ride button if you have completed the payment</p>
       </div>
        
    </div>
  )
}

export default FinishRide