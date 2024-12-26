import express from 'express'
const router=express.Router()
import {body,query} from 'express-validator'
import { confirmRide, createRideController, endRide, startRide } from '../controllers/ride.controller.js'
import { authCap, authUser } from '../middlewares/auth.middleware.js'
import { getFare } from '../services/ride.service.js'
router.post('/create',
    authUser,
body('userId').isString().isLength({min:24,max:24}).withMessage("Invalid user Id"),
    body('pickup').isString().isLength({min:3}).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination address"),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage("Invalid vehicle type"),
    createRideController
)

router.post('/get-fare',
    body('pickup').isString().isLength({min:3}).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination address"),
    // body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage("Invalid vehicle type"),
    async(req,res)=>{
        const {pickup,destination,vehicleType}=req.body
        const fare=await getFare(pickup,destination)
        res.status(200).json(fare)
    }
)

router.post('/confirm',authCap,
    body('rideId').isMongoId().withMessage("Invalid Ride Id"),
    confirmRide    
)

router.get('/start-ride',
    authCap,
    query('rideId').isMongoId().withMessage("Invalid Ride id"),
    query('otp').isString().isLength({min:6,max:6}).withMessage("Invalid otp"),
    startRide
)

router.post('/end-ride',
    authCap,
    body('rideId').isMongoId().withMessage("Invalid Ride Id"),
    endRide
)
export default router