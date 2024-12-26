import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSocket } from '../context/SocketContext';

function Riding() {

  const {socket}=useSocket()
  const navigate=useNavigate()

  socket.on('ride-ended',(obj)=>{
    console.log(obj);
    navigate('/home')
    
  })
    const location=useLocation()
    const ride=location?.state?.ride
  return (
    
    <div className='h-screen w-full'>
        <div 
        onClick={()=>{
            navigate('/home')
        }}
        className='fixed top-2 rounded-full right-2 h-10 w-10 bg-white flex items-center justify-center'>
            <i className='text-lg font-bold ri-home-5-line'></i>
        </div>
          <div className='h-1/2'>
          <img className="h-full w-full object-cover" src="https://www.hardreset.info/media/resetinfo/2021/284/a33a4d97865e485c97dba86683552410/apps-uber.jpg" alt="" />
          </div>
          <div className='h-1/2 p-4 '>
          <div className="my-3 px-2  flex items-center justify-between">
     <img className='h-16 ml-[-20px]' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
      <div className='text-end'>
        <h2 className='text-lg font-semibold'>{ride?.captain.fullName.firstName}</h2>
        <h2 className='text-xl font-bold'>{ride?.captain.vehicle.plate}</h2>
        <p className='text-gray-600 text-sm font-normal'>White Suzuki S-Presso LXI</p>

      </div>
      </div> 
      <div className='w-full '>
          {/* <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div className='w-[80%]' >
                    <h3 className='text-xl font-bold'>562/11-A</h3>
                    <p className='text-base text-gray-600  font-normal overflow-x-scroll h-15 text-nowrap scrollbar-thin'>{ride?.pickup}</p>
                </div>
            </div> */}
            <hr className='w-[77%] absolute border-1 right-4'/>
            <div className='flex items-center gap-2 justify-start p-3'>
                <i className="ri-map-pin-2-fill h-10 w-10  flex items-center justify-center"></i>
                <div className='w-[80%]' >
                    <h3 className='text-xl font-bold'>Destination</h3>
                    <p className='text-base text-gray-600  font-normal overflow-x-scroll h-15 text-nowrap scrollbar-thin'>{ride?.destination}</p>
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
            <button className=' w-full active:bg-green-700 bg-green-500 text-white font-semibold p-2 rounded-lg' type="submit">Make a payment</button>
          </div>
    </div>
  )
}

export default Riding