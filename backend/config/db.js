
import mongoose from 'mongoose'


const connectDb = async ()=>{

    try {
        const connect=await mongoose.connect(process.env.MONGO_URI)
        
    } catch (error) {
        console.log("connect database error",error)
    }
}
module.exports=connectDb

// HQhtLTzLPrMJO6fI