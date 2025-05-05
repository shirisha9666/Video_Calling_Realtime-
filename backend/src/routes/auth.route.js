import express from "express"
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const rounter=express.Router();

rounter.post("/signup",signup)
rounter.post("/login",login)
rounter.post("/logout",logout)
rounter.post("/onboarding",protectRoute,onboard)
// check if user login in or not
rounter.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})


export default rounter