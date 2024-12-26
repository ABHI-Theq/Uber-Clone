import React,{useContext, useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import VehiclePanel from '../Components/VehiclePanel'
import Confirmedride from '../Components/Confirmedride'
import LookingForDriver from '../Components/LookingForDriver'
import WaitingForDriver from '../Components/WaitingForDriver'
import { handleSuggestions } from '../hooks/useGetSuggestions'
import toast from 'react-hot-toast'
import { useSocket } from '../context/SocketContext'
import {  UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [pickup,setPickup]=useState('')
  const [destination,setDestination]=useState('')
  const [panelOpen,setPanelOpen]=useState(false)
  const panelRef=useRef(null)
  const [vehiclePanel,setVehiclePanel]=useState(false)
  const vehiclePanelRef=useRef(null)
  const [confirmedRidePanel,setConfirmedRidePanel]=useState(false)
  const confirmedRidePanelRef=useRef(null)

  const [vehicleFound,setVehicleFound]=useState(false)
  const vehicleFoundRef=useRef(null)

  const waitingforDriverRef=useRef(null)
  const [waitingforDriver,setWaitingforDriver]=useState(false)

  const [pickupSuggestions,setPickupSuggestions]=useState(null)
  const [destinationSuggestions,setDestinationSuggestions]=useState(null)
  const [ activeField, setActiveField ] = useState('pickup')
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  
  const [ ride, setRide ] = useState(null)

  const {socket,sendMsg,receiveMsg}=useSocket()

  const {user ,setUser}=useContext(UserDataContext)

  const navigate=useNavigate()
  // console.log(user)
  useEffect(()=>{
    console.log("sending msg join to ",user._id);
    
    sendMsg("join",{userId:user._id,userType:"user"})
  },[user])

  socket.on('ride-confirmed',(ride)=>{
    setRide(ride)
    // console.log("ride confirmed",ride)

    setVehicleFound(false)
    setWaitingforDriver(true)
  })

  socket.on('ride-started',(obj)=>{
    console.log(obj);
    
    setWaitingforDriver(false)
    navigate('/riding',{state:{ride:obj}})
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    // console.log(pickup,pickup==='');
    // if(pickup===''){
    //   return;
    // }
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data)
    } catch(e) {
        // handle error
        toast.error(e.message)
    }
  }
    const handleDestinationChange = async (e) => {
      setDestination(e.target.value)
      if(destination===''){
        return;
      }
      try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
              params: { input: e.target.value },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          setDestinationSuggestions(response.data)
      } catch(e) {
          // handle error
          toast.error(e.message)
      }
}
  

async function findTrip() {
  setVehiclePanel(true)
  setPanelOpen(false) 

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, 
      { pickup, destination },
      {headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  // console.log(response.data);
  setFare(response.data)


}

async function RideCreation(vtp){
          try {
  
              const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
                  {pickup:pickup,destination:destination,vehicleType:vtp},
                  {
                      headers:{
                          'authorization':`Bearer ${localStorage.getItem('token')}`
                  }}
              )

              if(response.status===200){
                  // console.log(response.data)
              }else{
                  throw new Error(response.statusText)
              }
              
          } catch (error) {
            
              toast.error(error.message)
          }
}







  const submitHandler=(e)=>{
    e.preventDefault()

  }
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:"70%",
        display:'block'
      })
    }else{
      gsap.to(panelRef.current,{
        height:"0%",
        display:'none'
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
        }) 
    }
  },[vehiclePanel])


  useGSAP(function(){
    if(confirmedRidePanel){
      gsap.to(confirmedRidePanelRef.current,{
        // transform:'translateY(0)'
        height:"84%",
        display:"block"
      })
    }else{
      gsap.to(confirmedRidePanelRef.current,{
        // transform:'translateY(100%)'
        height:"0",
        display:"none"
        }) 
    }
  },[confirmedRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        // transform:'translateY(0)'
        height:"80%",
        display:"block"
      })
    }else{
      gsap.to(vehicleFoundRef.current,{
        // transform:'translateY(100%)'
        height:"0",
        display:"none"
      })
    }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingforDriver){
      gsap.to(waitingforDriverRef.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(waitingforDriverRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[waitingforDriver])
  return (
    <div className="h-screen w-full relative overflow-x-hidden">
            <img className='w-16 absolute left-5 top-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='h-screen w-full'>  
          <img className="h-full w-full object-cover" src="https://www.hardreset.info/media/resetinfo/2021/284/a33a4d97865e485c97dba86683552410/apps-uber.jpg" alt="" />
        </div>
        <div className=' h-screen flex flex-col justify-end top-0 absolute w-full '>
          <div className="h-[35%] p-5 bg-white relative rounded-l-2xl rounded-r-2xl ">
            <h5 className='absolute top-6 right-6'>
            <i 
            onClick={()=>{
              setPanelOpen(false)
            }}
            className={`ri-arrow-down-double-line ${panelOpen? '':'hidden'} `}
            ></i>
            </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form action="" onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[37%] left-7 rounded-full bg-gray-900"></div>
            <input
             className='bg-[#eeeeee] px-8 py-2 text-base rounded-lg w-full mt-5'
              type="text" 
              onClick={()=>{
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={(e)=>{
                if(e.target.value===''){
                  setPickup('')
                }else{
                  handlePickupChange(e)
                }
              }}
              placeholder="Add a pick up location" />
            <input 
             className='bg-[#eeeeee] px-8 py-2 text-base rounded-lg w-full mt-3' 
             type="text" 
             onClick={()=>{
              setPanelOpen(true)
              setActiveField('destination')
            }}
             value={destination}
             onChange={(e)=>{
              if(e.target.value===''){
                setDestination('')
              }else{
                handleDestinationChange(e)
              }
            }}
             placeholder="Enter your destination " />

             <button type="submit" 
             onClick={findTrip}
             className={`w-full p-2 bg-[#0a0a0a] text-white text-lg font-medium my-3 rounded-xl `}>Find Trip</button>

          </form>
          </div>
          <div 
          ref={panelRef}

          className={`h-0  bg-white p-5 
            `}>
              <LocationSearchPanel
                     suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                     setPanelOpen={setPanelOpen}
                     setVehiclePanel={setVehiclePanel}
                     setPickup={setPickup}
                     setDestination={setDestination}
                     activeField={activeField}
              />
          </div>
        </div>
        <div ref={vehiclePanelRef} className='bg-white p-5 fixed w-full bottom-0 translate-y-full'>
          <VehiclePanel  fare={fare} svt={setVehicleType}  vp={vehiclePanel} svp={setVehiclePanel} scrp={setConfirmedRidePanel}/>
        </div>
        <div ref={confirmedRidePanelRef} className='px-3 py-6 bg-white fixed bottom-0 w-full  h-0'> 
          <Confirmedride RideCreation={RideCreation} vt={vehicleType} fare={fare} svf={setVehicleFound} pickup={pickup} dest={destination} svp={setVehiclePanel} crp={confirmedRidePanel} scrp={setConfirmedRidePanel}  />
        </div>
        <div ref={vehicleFoundRef} className='w-full p-4 fixed bottom-0 h-0 bg-white'>
            <LookingForDriver pickup={pickup} dest={destination} vt={vehicleType} fare={fare}  svf={setVehicleFound}/>
        </div>
        <div ref={waitingforDriverRef} className="w-full fixed bottom-0 translate-y-full p-1 bg-white">
          <WaitingForDriver ride={ride} swfd={setWaitingforDriver}/>
        </div>

    </div>
  )
}

export default Home