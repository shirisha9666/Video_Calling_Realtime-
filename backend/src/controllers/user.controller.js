import FriendRequest from "../models/FriendsRequest.js";
import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;
        const recommendedusers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },//exclude current user
                { _id: { $nin: currentUser.friends } }, // exclude current user's friends
                { isOnboarded: true }
            ]
        })
        res.status(200).json(recommendedusers)
    } catch (error) {
        console.log("Error in getRecmmendedUsers :", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const getMyFriends = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .select("friends").populate("friends", "fullname profilePic nativeLanguage learningLanguage")
        res.status(200).json(user.friends)



    } catch (error) {
        console.log("Error in getMyFriends :", error)
        res.status(500).json({ message: "Internal Servar error" })
    }
}
export const sendFriendsRequest = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;
        //prevent sending req to yourself
        if (myId === recipientId) {
            return res.status(400).json({ message: "You can't send friends request to yourself" })
        }
        const recipient = await User.findById(recipientId)
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" })
        }
        // check if user is alredy friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "you are already friends with user" })
        }
        // checks if a req already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [{ sender: myId, recipient: recipientId },
            { sender: recipientId, recipient: myId }
            ]
        })
        if (existingRequest) {
            return res.status(400).json({ message: "A friend request already exists between you and this user" })
        }
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })
        res.status(200).json(friendRequest)
    } catch (error) {
        console.log("Error in sendFriendsRequest", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const acceptFriendsRequest = async (req, res) => {
    try {
        const { id: requestId } = req.params;
        console.log("requestId", requestId)
        const friendRequest = await FriendRequest.findById(requestId)
        // console.log("friendRequest",friendRequest)
        if (!friendRequest) {
            return res.status(404).json({ message: "Friend Request not found" })
        }
        // verify the current user in the recipient
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request" })
        }
        friendRequest.status = "accepted";
        await friendRequest.save()
        // add each user to the others's friends array

        // addToSet : add elements to an array only if do not already exist

        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        })
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        })
        res.status(200).json({ message: "Friend request accepted" })
    } catch (error) {
        console.log("Erron in acceptFriendsRequest :", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const getFriendRequests = async (req, res) => {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullname profilePic nativeLanguage learningLanguage")

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient", "fullname profilePic")
        res.status(200).json({ incomingReqs, acceptedReqs })

    } catch (error) {
        console.log("Error in getFriendRequests ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getOutgoingFriendReqs=async(req,res)=>{
    try {
       const outgoingRequests=await FriendRequest.find({
        sender:req.user.id,
        status:"pending"
       }).populate("recipient","fullname profilePic nativeLanguage learningLanguage") 
       res.status(200).json(outgoingRequests)
    } catch (error) {
        console.log("error in getOutgoingFriendReqs",error)
    res.status(500).json({message:"Internal Server error"})
    }
}