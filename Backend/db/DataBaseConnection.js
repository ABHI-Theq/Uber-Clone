import mongoose from 'mongoose'

export const connectDB=async ()=>{
    try {
        
        mongoose.connect(process.env.CONN_STR,{
            useNewUrlParser:true
        }).then(()=>{
            console.log('MongoDB connected')
        }).catch((err)=>{
            console.log(err)
        })

    } catch (error) {
        console.log(error.message);
    }
}
