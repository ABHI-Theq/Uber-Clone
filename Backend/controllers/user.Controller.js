import User from '../models/user.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
export const SignUp=async (req,res)=>{

    const errors=validationResult(res);
    // console.log(req);
    

    if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
    }

    const {firstName,lastName,email,password}=req.body;

    try{
        if(!firstName || !lastName || !email || !password){
        alert('All fields are required');
        return;
    }

    const hashedPassword=await User.hashPassword(password)
    const user=await User.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password:hashedPassword,
        cleanpwd:password
    })
    const token=user.generateAuth()
    res.cookie('jwt',token)
    res.status(201).json({token,user})}
    catch(e){
        return res.status(400).json({e});
        
    }
}

export const Login=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    

    try {
        const {email,password}=req.body;
        
        if( !email || !password){
            alert('All fields are required');
            return;
        }

        const user=await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({error:'Invalid credentials'})
        }

        const isMatched=await user.comparePassword(password)
        if(!isMatched){
            return res.status(401).json({error:'Invalid credentials'})
        }
        const token=user.generateAuth()
        res.cookie('jwt',token)
        res.status(200).json({token,user})
        return;

    } catch (error) {
        return res.status(400).json({error})
    }

}
export const ShowDetails=async (req,res)=>{
    try{
        const user=req.user;
        res.status(201).json({user})
    }
    catch(e){
        return res.status(401).json({error:'Unauthorized'})
    }
}

export const logout=async (req,res)=>{
    res.clearCookie('jwt')
    req.headers.authorization=''
    return res.status(200).json({message:'Logged out successfully'})
}