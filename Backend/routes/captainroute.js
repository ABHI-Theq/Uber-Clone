import Captain from "../models/Captains.js";
import express from 'express'
import {body} from 'express-validator'
import { registerCap,Logincap, logout, ShowDetails } from "../controllers/captain.controller.js";
import { authCap } from "../middlewares/auth.middleware.js";
const router=express.Router()

router.post('/register',[
    
    body('email').isEmail().withMessage(
        'Invalid Email'
    ),
    body('firstName').isLength(3).withMessage(
        'name length must be longer than 3'
    ),
    body('lastName').isLength(3).withMessage(
        'name length must be longer than 3'
    ),
    body('password').isLength(6).withMessage(
        'password length must be longer than 3'
    ),
    body('color').isLength(3).withMessage('color must be longer than 3'),
    body('type').isIn('car','motorcycle','auto').withMessage(
        'invalid vehicle type'
    )
],
registerCap
 )

router.post('/login',[
    body('email').isEmail().withMessage(
        'so u need THIS'
    )
 ],
Logincap)

router.get('/logout',logout)

router.get('/profile',authCap,ShowDetails)

export default router;