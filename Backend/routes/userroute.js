import express from 'express'
import {body} from 'express-validator'
import {SignUp,Login,ShowDetails, logout} from '../controllers/user.Controller.js'
import { authUser } from '../middlewares/auth.middleware.js'
const router=express.Router() 

router.post('/register',
    [
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
    ]
    ,
SignUp
)
router.post('/login',[
    body('email').isEmail().withMessage(
        'Invalid Email'
    ),
    body('password').isLength(6).withMessage(
        'Invalid Email'
    ),
],
Login)

router.get('/profile',authUser,ShowDetails)

router.get('/login',logout)

export default router