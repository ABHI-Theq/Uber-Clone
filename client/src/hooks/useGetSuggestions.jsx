import axios from 'axios'
import { useState } from 'react';
import toast from 'react-hot-toast'
export const handleSuggestions=async(e)=>{

    const [suggestions,setSuggestions]=useState(null)

    // setPickup(e.target.value);
    try {
        
        const response=await axios.get("http://localhost:7000/map/get-suggestions",{params:{input:e.target.value},
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }}
        )
        if(response.status===200){
            setSuggestions(response.data.predictions)
        }else{
            throw new Error(response.statusText);
        }
    return {suggestions,setSuggestions}    
    } catch (error) {
     toast.error(error.message)   
    }
}