import express from "express"
import { getStreamToken } from "../controllers/chat.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const rounter=express.Router()
rounter.get("/token",protectRoute,getStreamToken)

export default rounter