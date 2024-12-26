import { useContext,createContext, Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainContextUse } from "../context/CaptainContext";
import axios from 'axios'

const CaptainProtectWrapper=({
    children
})=>{
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = CaptainContextUse()
    const [ isLoading, setIsLoading ] = useState(true)




    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!token) {
                navigate('/captain-login');
                return;
            }

            
            
            try {
                console.log("Fetching user profile...");

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(response);
                

                if (response.status === 201) {
                    setCaptain(response.data.captain);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Error fetching user profile:", err);
                localStorage.removeItem('token');
                navigate('/captain-login');
            } 
        };

        fetchUserProfile();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper