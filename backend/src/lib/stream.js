import {StreamChat} from "stream-chat";
import "dotenv/config"
const apiKey=process.env.STEAM_API_KEY;
const apiSecret=process.env.STEAM_API_SECRET


if(!apiKey || !apiSecret){
    console.error("Stream APi key or Secret is Missing")
}
const streamClient=StreamChat.getInstance(apiKey,apiSecret)

export const upsertStreamUser=async(userData)=>{
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
       console.log("Error upserting Stream user :",error) 
    }
}
// todo:do it later

export const generateStreamToken=(userId)=>{
    try {
        // ensure userId is a string
        
        const userIdStr=userId.toString();
        return streamClient.createToken(userIdStr)
        
    } catch (error) {
        console.log("Error generating Stream token:",error)
    }
};