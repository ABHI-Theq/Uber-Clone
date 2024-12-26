import React,{useContext,createContext,useState} from 'react'


const CaptainContext=createContext()
export const CaptainContextUse=()=>{
  return useContext(CaptainContext)
}

function CaptainContextProvider({children}) {
    const [captain,setCaptain]=useState(JSON.parse(localStorage.getItem('captain')) || null)
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)

    const updateCaptain=(captainData)=>{
        setCaptain(captainData)
    }
  return (
    <CaptainContext.Provider value={{captain,setCaptain,updateCaptain,isLoading,setIsLoading,error,setError}}>
        {children}
    </CaptainContext.Provider>
  )
}

export default CaptainContextProvider