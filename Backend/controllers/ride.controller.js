import Ride from "../models/ride.model.js";
import { getAddressCoordinate, getCaptainsInTheRadius } from "../services/map.service.js";
import { ConfirmRide, CreateRide, EndRide, StartRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";

export const createRideController=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({error:errors.array()})
    }
    const {pickup,destination,vehicleType}=req.body
    // console.log(req.user);
    try {        
        const ride=await CreateRide({userId:req.user._id,pickup,destination,vehicleType});
         

             const pickupCoor=await getAddressCoordinate(pickup)
            
            
        const rideRef={...ride};
        
        rideRef.otp=""
        const rideRefUser=await Ride.findOne({_id:ride._id}).populate('userId')

        // console.log(rideRefUser);
        
         const captainInRadius=await getCaptainsInTheRadius(pickupCoor.lat,pickupCoor.lng,500)

        captainInRadius.map(captain=>{
            
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideRefUser
            })
        })

         return res.status(200).json(ride)
         

    } catch (error) {
        console.log(error);
        
        return res.status(400).json({message:error.message})
    }
}

export const confirmRide=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()})
    }
    const {rideId,captain}=req.body;
    try {
        
        const ride=await ConfirmRide({rideId,captain:captain})
        

        sendMessageToSocketId(ride.userId.socketId,{
            event:"ride-confirmed",
            data:ride
        })
        

        return res.status(201).json(ride)
    } catch (error) {
        return res.status(404).json({error:error})
    }
}

export const startRide=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()})
        }

        const {rideId,otp}=req.query;
        try {
            const ride=await StartRide({rideId,otp,captain:req.captain})

            // console.log(ride);
            
            sendMessageToSocketId(ride.userId.socketId,{
                event:'ride-started',
                data:ride
            })

            return res.status(200).json(ride)
        } catch (error) {
            return res.status(500).json(error)
        }
}

export const endRide=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()})
        }

        const {rideId}=req.body;
        try {
            const ride=await EndRide({rideId,captain:req.captain})
            // console.log(ride);
            sendMessageToSocketId(ride.userId.socketId,{
                event:'ride-ended',
                data:ride
                })
                return res.status(200).json(ride)
        }catch(e){
            console.log(e);
            
            return res.status(400).json(e)
        }
}