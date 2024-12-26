import { Server } from "socket.io";
import User from "./models/user.js";
import Captain from "./models/Captains.js";

let io;

export function IntializeSocket(server){
    io=new Server(server,{
        cors:{
            origin: "*",
            methods: ["GET", "POST"],
        }
    });


    io.on('connection',(socket)=>{
        console.log('a new client connected',socket.id);

        socket.on('join',async(data)=>{
            const {userId,userType}=data
            console.log(data);
            

            if(userType==='user'){
                await User.findByIdAndUpdate(userId,{socketId:socket.id})
            }else{
                await Captain.findByIdAndUpdate(userId,{socketId:socket.id})
            }
        })

        socket.on('update-location-captain',async(data)=>{
            const {userId,location}=data
            
            

            if(!location || !location.lat || !location.lng){
                throw new Error("Invalid location")
            }

            // console.log(data);
            await Captain.findByIdAndUpdate(userId,{
                location:
                {
                    lat:location.lat,
                    lng:location.lng
                }
            })
        })

        socket.on('disconnect',()=>{
            console.log('client disconnected',socket.id);
            
        });
    })
}

export function sendMessageToSocketId(SocketId,messageObj){
    // console.log(messageObj);
    // console.log(SocketId);
    
    
    if(io){
        io.to(SocketId).emit(messageObj.event,messageObj.data);
    }else{
        console.log("Socket.io Is not intialized");
    }
}