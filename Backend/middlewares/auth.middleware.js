import Captain from '../models/Captains.js';
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const authUser=async(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1] || req.cookies?.jwt
    // console.log(token);
    
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    try{
        const decoded= jwt.verify(token,process.env.SECRET_KEY)
        // console.log(decoded);
        
        const user=await User.findById(decoded.id).select('-password')
        req.user=user 
    }catch(err){
        return res.status(401).json({message:"unauthorized"})
  
    }
    next()
}


export const authCap=async(req,res,next)=>{
    const token=req.cookies?.jwt || req.headers.authorization?.split(" ")[1]
    // console.log(token);
    
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    try{
        const decoded= jwt.verify(token,process.env.SECRET_KEY)
        // console.log(decoded);
        
        const capsy=await Captain.findById(decoded.id).select('-password').select('-cleanPwd')
        req.captain=capsy
    }catch(err){
        return res.status(401).json({message:"unauthorized"})
  
    }
    next()
}