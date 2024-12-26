import {useContext,createContext, useState} from 'react'

const AuthContext=createContext()
export const AuthContextUse=()=>{
    return useContext(AuthContext)
}
const AuthContextProvider=({children})=>{
    const [authUser,setAuthUser]=useState('')

    return(
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider