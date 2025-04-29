import express from "express";
import dontenv from "dotenv"
dontenv.config()

const app=express()
const PORT=process.env.PORT || 5001
app.get("/",(req,res)=>res.send("hey i am working"))
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})