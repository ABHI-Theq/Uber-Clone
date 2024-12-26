import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const newUser=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"min of 3 length"]
        },
        lastName:{
            type:String,
            minlength:[3,"min length of 3"]
        }
    },
    cleanPwd:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"Email must be of 5 character long"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    }
})

newUser.methods.generateAuth= function(){
    const token= jwt.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:process.env.EXPIRES_IN
    })
    return token
}

newUser.methods.comparePassword=async function(password){
    return await bcrypt.compare(password, this.password)
}

newUser.statics.hashPassword=async function(password){
    const salt=bcrypt.genSaltSync(10)
    const pwd=await bcrypt.hash(password,salt)
    return pwd
}

const User =mongoose.model('user',newUser)
export default User;