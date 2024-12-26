import axios from 'axios';
import Captain from '../models/Captains.js';

export const getAddressCoordinate = async (address) => {
    const apikey = process.env.GOMAP_MAP_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;
    
    try {
        const response = await axios.get(url);

        // Check if the request was successful
        if (response.status === 200) {
            const data = response.data;

            console.log(data);
            
            // Ensure results exist
            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return {
                    lat: location.lat,
                    lng: location.lng,
                };
            } else {
                throw new Error('No results found for the given address.');
            }
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching address coordinates:', error.message);
        throw error;
    }
};

export const getDisTime=async(origin,destination)=>{

    if(!origin || !destination){
        throw new Error("Origin and destination are required")
    }

    const apiKey=process.env.GOMAP_MAP_API_KEY;

    const url=`https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`

    try {
        
        const response=await axios.get(url);
                // Check if the request was successful
                if (response.status === 200) {
                    const data = response.data;
        
                    // console.log(data.rows[0].elements[0]);
                    
                    // Ensure results exist
                    if (data.rows[0].elements[0].status!=="ZERO_RESULTS") {
                        return data.rows[0].elements[0];
                    } else {
                        throw new Error('No results found for the given address.');
                    }
                } else {
                    throw new Error(`Request failed with status: ${response.status}`);
                }

    } catch (error) {
        console.error(error);
        throw error;
        
    }
}

export const  getAutoSuggestions=async(stIn)=>{
    if(!stIn){
        throw new Error("query is required")
    }

    const apikey=process.env.GOMAP_MAP_API_KEY
    // console.log(stIn);
    
    const url=`https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(stIn)}&key=${apikey}`
// curl --location 'https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=%3Cstring%3E&offset=3&location=40%2C-110&radius=1000&language=en&key=%3CAPI%20Key%3E'

    try {
        
        const response=await axios.get(url)

        if(response.status===200){
            return response.data.predictions;
            
        }else{
            throw new Error("Unable to fetch")
        }

    } catch (error) {
        console.error(error);
        throw error;
        
    }
}

export const getCaptainsInTheRadius=async(lat,lng,radius)=>{

    //radius in km

    const captains=await Captain.find({
        location:{
            $geoWithin:{
                $centerSphere:[[lat,lng],radius/6371]
            }
        }
    })
    return captains
}

