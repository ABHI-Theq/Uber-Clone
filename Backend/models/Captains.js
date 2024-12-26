import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const newCap=new mongoose.Schema({
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
    cleanPwd:{
        type:String
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        required:true,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true
        },
        plate:{
            type:String,
            required:true
        },
        capacity:{
            type:Number,
            required:true
        },
        type:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"]
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number
        }
    }
},{timestamps:true})

newCap.methods.generateAuth= function(){
    const token= jwt.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:process.env.EXPIRES_IN
    })
    return token
}

newCap.methods.comparePassword=async function(password){
    return await bcrypt.compare(password, this.password)
}

newCap.statics.hashPassword=async function(password){
    const salt=bcrypt.genSaltSync(10)
    const pwd=await bcrypt.hash(password,salt)
    return pwd
}

const Captain =mongoose.model('captain',newCap)
export default Captain;