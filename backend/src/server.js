import express from "express";
import dontenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import { connectDb } from "./lib/Db.js";
import cookieParser from "cookie-parser"
dontenv.config()

const app=express()
const PORT=process.env.PORT || 5001
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.listen(PORT,()=>{
  console.log(`server running at ${PORT}`)
    connectDb()
})