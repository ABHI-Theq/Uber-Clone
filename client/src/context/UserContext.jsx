import { createContext,useContext, useState } from "react";

export const UserDataContext=createContext()

// export const UserContextUse=()=>{
//     return useContext(UserDataContext)
// }

const UserContext=({children})=>{
    const [user,setUser]=useState({
        fullName:{
            firstName:'',
            lastName:''
        },
        email:'',
        password:''
    })
    // if(localStorage.getItem('user')){
    //     setUser(JSON.parse(localStorage.getItem('user')))
    // }
    return (
        <UserDataContext.Provider value={{user,setUser}}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;