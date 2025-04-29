import express from "express";
import dontenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import { connectDb } from "./lib/Db.js";
dontenv.config()

const app=express()
const PORT=process.env.PORT || 5001
app.use("/api/auth",authRoutes)
app.listen(PORT,()=>{
  console.log(`server running at ${PORT}`)
    connectDb()
})