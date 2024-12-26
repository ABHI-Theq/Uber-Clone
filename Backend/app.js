import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import userroute from './routes/userroute.js'
import captainroute from './routes/captainroute.js'
import cookieParser from 'cookie-parser';
import maprouter from "./routes/map.routes.js"
import rideroute from './routes/ride.route.js'
const app=express()
//to use accept request from all domains but while developing it accept from domain web name that we will set in cors func
app.use(cors())  
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',userroute)
app.use('/captain',captainroute)
app.use('/map',maprouter)
app.use('/rides',rideroute)

app.get("/",(req,res)=>{
    res.send("Hello World")
})


export default app