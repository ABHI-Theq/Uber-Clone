import mongoose from 'mongoose'

const RideModel=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captain'
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending'
    },

    duration:{
        type:Number,
    },

    distance:{
        type:Number
    },
    paymentId:{
        type:String
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false
    }
})

const Ride=mongoose.model('Ride',RideModel)
export default Ride
