import express from "express"
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const rounter=express.Router();

rounter.post("/signup",signup)
rounter.post("/login",login)
rounter.post("/logout",logout)
rounter.post("/onboarding",protectRoute,onboard)


export default rounter