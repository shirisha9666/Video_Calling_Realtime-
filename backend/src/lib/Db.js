import mongoose from "mongoose"

export const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL) 
        console.log( `mongoDb connected  : ${conn.connection.host}`) 
    } catch (error) {
        console.log(`error mongodb connecting  : ${error}`)
        process.exit(1);
    }

}