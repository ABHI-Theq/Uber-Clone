import {getAddressCoordinate, getAutoSuggestions, getDisTime} from '../services/map.service.js'
import { validationResult } from 'express-validator';
import Captain from '../models/Captains.js'
export const getCoordinates=async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
        }
    const {address}=req.query;

    try {
        const coordinates=await getAddressCoordinate(address)
        return res.status(200).json(coordinates)

    } catch (error) {
         res.status(404).json({msg:error.message})
    }
}

export const getDistanceTime=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
        }
        const {origin,destination}=req.query
    try {

        const distanceTime=await getDisTime(origin,destination)

        return res.status(200).json({distancetime:distanceTime})

    } catch (error) {
        console.error(error);
        return res.status(500).json({msg:error.message})
        
    }
}

export const getAutoCompleteSuggestions=async(req,res,next)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
        }

    const {input}=req.query;

    try {
        const suggestions=await getAutoSuggestions(input)
        return res.status(200).json(suggestions)
    } catch (error) {
        console.error(error);
        return res.status(500).json({msg:error.message})
    } 
}

