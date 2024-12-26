import { error } from "console";
import Ride from "../models/ride.model.js";
import {getDisTime} from './map.service.js'
import crypto from 'crypto'


export async function getFare(pickup,destination){
    try{if(!pickup || !destination){
        throw new Error('pickup and destination is required')
    }

    const distancetime=await getDisTime(pickup,destination)

    const baseFare={
        auto:30,
        car:50,
        motorcycle:20
    }

    const perKmRate={
        auto:10,
        car:15,
        motorcycle:8
    }

    const perMinuteRate={
        auto:2,
        car:3,
        motorcycle:1.5
    }

    const fare = {
        auto: Math.round(baseFare.auto + (distancetime.distance.value/1000 * perKmRate.auto) + (distancetime.duration.value/60 * perMinuteRate.auto)),
        car:Math.round( baseFare.car + (distancetime.distance.value/1000 * perKmRate.car) + (distancetime.duration.value/60 * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + (distancetime.distance.value/1000 * perKmRate.motorcycle) + (distancetime.duration.value/60 * perMinuteRate.motorcycle)),
      };

      return fare;}
      catch(e){
        console.error(e);
        
      }
}



function getOtp(num){
    const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}


export const CreateRide=async(
    {userId,pickup,destination,vehicleType}
)=>{


    
    // console.log(userId,pickup,destination,vehicleType);
    

    if(!userId || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required')
    }
    const fare=await getFare(pickup,destination)

    const ride=await Ride.create({
        userId,
        pickup,
        destination,
        otp:getOtp(6),
        fare:fare[vehicleType]
    })

    return ride
}


export const ConfirmRide=async({rideId,captain})=>{
    if(!rideId || !captain){
        throw new Error('All fields are required')
    }

    await Ride.findByIdAndUpdate(rideId,{
        status:'accepted',
        captain:captain._id
    })
    const ride=await Ride.findOne({_id:rideId}).populate('userId').populate('captain').select('+otp');
    if(!ride){
        throw new Error("Ride not found")
    }

    return ride;
}

export const StartRide=async({rideId,otp,captain})=>{
    if(!rideId || !otp || !captain){
        throw new Error('All fields are required')
        }

        const ride=await Ride.findOne({
            _id:rideId,
        }).populate('userId').populate('captain').select('+otp')

        if(!ride){
            throw new Error("Ride not found")
        }

        if(ride.otp!==otp){
            throw new Error("Invalid OTP")
        }
        await Ride.findByIdAndUpdate(rideId,{
            status:'ongoing',
        })

        return ride;
}

export const EndRide=async({rideId,captain})=>{
    if(!rideId || !captain){
        throw new Error('All fields are required')
        }

        const ride=await Ride.findOne({
            _id:rideId,
            captain:captain._id
        }).populate('userId').populate('captain').select("+otp")

        if(!ride){
            throw new Error("Ride not found")
        }

        if(ride.status!=='ongoing'){
            throw new Error("Ride is not ongoing")
        }
        await Ride.findByIdAndUpdate(rideId,{
            status:'completed',
        })
        return ride;
}

    