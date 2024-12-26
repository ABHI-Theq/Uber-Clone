import app from './app.js'
import http from 'http'
import {Server} from 'socket.io'
import {connectDB} from './db/DataBaseConnection.js'
import User from './models/user.js'
import Captain from './models/Captains.js'
import { IntializeSocket } from './socket.js'
connectDB()
const server=http.createServer(app)

// const io=new Server(server,{
//     cors:{
//         origin: "*",
//         methods: ["GET", "POST"],
//         credentials: true
//         }
// })

// io.on('connection',(socket)=>{
//     console.log('a user connected',socket.id) 

//     socket.on('join',async(data)=>{
//         const {userId,userType}=data;

//         if(userType==='user'){
//             await User.findByIdAndUpdate(userId,{socketId:socket.id})
//         }else{
//             await Captain.findByIdAndUpdate(userId,{socketId:socket.id})
//         }
//     })
//     io.to(socketId).emit("message",message)
//     socket.on('disconnect',()=>{
//         console.log('a user disconnected',socket.id)
//     })
// })

IntializeSocket(server)


const port=process.env.PORT || 7000
server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})