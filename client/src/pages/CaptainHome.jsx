import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import ConfirmRidePopup from '../Components/ConfirmRidePopup'
import { CaptainContextUse } from '../context/CaptainContext'
import { useSocket } from '../context/SocketContext'
import { Socket } from 'socket.io-client'
import toast from 'react-hot-toast'
import axios from 'axios'

function CaptainHome() {

  const [ridePopupPanel,setRidePopupPanel]=useState(false)
  const ridePopupPanelRef=useRef(null)

  const [ConfirmRidePopupPanel,setConfirmRidePopupPanel]=useState(false)
  const ConfirmRidePopupPanelRef=useRef(null)
  const [ride,setRide]=useState(null)
  const {captain}=CaptainContextUse();
  // const 

  // console.log(captain);
  
  const {socket,sendMsg,receiveMsg}=useSocket()
  useEffect(()=>{
    sendMsg('join',{userId:captain._id,userType:'captain'})


    const updateLocation=()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          // console.log(captain._id,position.coords);
          
          sendMsg('update-location-captain',{
            userId:captain._id,
            location:{
              lat:position.coords.latitude,
              lng:position.coords.longitude
            }
          })
      })
    }
  }

  const locationInterval=setInterval(updateLocation,10000)
  return ()=>clearInterval(locationInterval)
  }

  ,[captain])

  socket.on('new-ride',(obj)=>{
    console.log(obj);
    setRide(obj)
    setRidePopupPanel(true)
  })
 
  
  async function confirmRide(){
    try {

      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
        captain:captain,
        rideId:ride._id
      },{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
    } catch (error) { 
      console.log(error);
      toast.error(error.message)
    }
  }


  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(100%)'
        })
    }
  },[ridePopupPanel])

  useGSAP(function(){
    if(ConfirmRidePopupPanel){
      gsap.to(ConfirmRidePopupPanelRef.current,{
        transform:'translateY(0)',
        display:'block'
      })
    }else{
      gsap.to(ConfirmRidePopupPanelRef.current,{
        transform:'translateY(100%)',
        display:'none'
        })
    }
  },[ConfirmRidePopupPanel])

  return (
    <div className='h-screen '>
      <div className='fixed  w-full top-0 p-3 flex items-center justify-between '>
      <img className='w-16 absolute left-5 top-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
    <Link to="/captain-home"
    className='fixed top-2 rounded-full right-2 h-10 w-10 bg-white flex items-center justify-center'>
        <i className='text-lg font-bold ri-logout-box-r-line'></i>
    </Link>
    </div>
      <div className='h-[60%]'>
      <img className="h-full w-full object-cover" src="https://www.hardreset.info/media/resetinfo/2021/284/a33a4d97865e485c97dba86683552410/apps-uber.jpg" alt="" />
      </div>
      <div className='h-[40%] py-8 px-5'>
        <CaptainDetails captain={captain}/>
      </div>

      <div ref={ridePopupPanelRef} className="bg-white z-10 fixed bottom-0 w-full translate-y-full  p-3"> 
        <RidePopUp
        confirmRide={confirmRide} 
        ride={ride} srpp={setRidePopupPanel} scrpp={setConfirmRidePopupPanel}/>
      </div>
      <div ref={ConfirmRidePopupPanelRef} className="bg-white z-10 fixed bottom-0 w-full translate-y-full p-3"> 
        <ConfirmRidePopup ride={ride} scrpp={setConfirmRidePopupPanel} srpp={setRidePopupPanel}/>
      </div>
</div>
  )
}

export default CaptainHome