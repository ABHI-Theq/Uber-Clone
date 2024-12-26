import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

 function UserLogout()  {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    

   axios.get(`${import.meta.env}/user/logout`)
    .then((response)=>
     { if(response.status===200){
        localStorage.removeItem('token')
        toast.success("Loggout out Successfully")
        navigate('/login')
    }})
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout