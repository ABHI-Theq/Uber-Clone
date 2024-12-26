import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../Components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../Components/LiveTracking'

function CaptainRiding() {
    const [finishRidePanel,setFinishRidePanel]=useState(false)
    const finishRidePanelRef=useRef(null)
    const location=useLocation()
    const rideData=location.state?.ride

    useGSAP(function(){
        if(finishRidePanel){
          gsap.to(finishRidePanelRef.current,{
            transform:'translateY(0)'
          })
        }else{
          gsap.to(finishRidePanelRef.current,{
            transform:'translateY(100%)'
            })
        }
      },[finishRidePanel])

  return (
    <div className='h-screen overflow-hidden'>
        <div className='fixed  w-full top-0 p-3 flex items-center justify-between '>
              <img className='w-16 absolute left-5 top-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to="/captain-home"
            className='fixed top-2 rounded-full right-2 h-10 w-10 bg-white flex items-center justify-center'>
                <i className='text-lg font-bold ri-logout-box-r-line'></i>
            </Link>
            </div>
            <div className='h-[82%]'>
      <img className="h-full w-full object-cover" src="https://www.hardreset.info/media/resetinfo/2021/284/a33a4d97865e485c97dba86683552410/apps-uber.jpg" alt="" />
      {/* <div className='h-full w-full'>
        <LiveTracking/>
      </div> */}
      </div>
      <div className='h-[20%]   bg-yellow-400 flex items-center relative justify-between px-6'
              onClick={()=>{
                setFinishRidePanel(true)
            }}>
        <h5 
        onClick={()=>{
            setFinishRidePanel(true)
        }}
        className=' h-[18%] w-full text-center absolute left-0 top-0 '>
            <i className='mx-auto  w-full text-2xl font-bold text-gray-600 ri-arrow-up-wide-line'></i>
        </h5>
        <h4 className='text-lg font-semibold'>4 KM away</h4>
        <button type="submit" className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='fixed bg-white z-10 w-full translate-y-full bottom-0 p-4'>
        <FinishRide
        ride={rideData}
         sfrp={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default CaptainRiding