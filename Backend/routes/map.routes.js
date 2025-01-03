import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js'
const router=express.Router()
import {query} from 'express-validator'
import { getAutoCompleteSuggestions, getCoordinates, getDistanceTime } from '../controllers/map.controller.js'


router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
    authUser,getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authUser,getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString(),
    authUser,
    getAutoCompleteSuggestions

)
export default router;