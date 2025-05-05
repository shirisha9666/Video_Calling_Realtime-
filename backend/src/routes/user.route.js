import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendsRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendsRequest } from "../controllers/user.controller.js";

const rounter=express.Router();
rounter.use(protectRoute)

rounter.get("/",getRecommendedUsers)
rounter.get("/friends",getMyFriends)
rounter.post("/friend-request/:id",sendFriendsRequest)
rounter.put("/friend-request/:id/accept",acceptFriendsRequest)
rounter.get("/friend-request",getFriendRequests)
rounter.get("/outgoing-friend-requests",getOutgoingFriendReqs)
export default rounter