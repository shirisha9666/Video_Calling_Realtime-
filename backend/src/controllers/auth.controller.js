import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const {fullname, email, password } = req.body;

    try {
        if (!fullname|| !password || !email) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be  at least 6 characters"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email formate" })
        }
        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(400).json({ message: "eamil existed try diffirent eamil id" })
        }
        const idx = Math.floor(Math.random() * 100) + 1
      
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser =await User.create({
            email,
            password,
            fullname,
            profilePic: randomAvatar
        })

        // create the user in the strems as well
        try {
            await upsertStreamUser({
                id:newUser._id.toString(),
                name:newUser.fullname,
                image:newUser.profilePic || ""
            })
            console.log(`Stream user created for ${newUser.fullname}`)
        } catch (error) {
           console.log("Error creting Stream user :" ,error) 
        }
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite: "strict", //prevent CSRF attacks
            secure: process.env.NODE_ENV === "production"
        })
        res.status(201).json({success:true,user:newUser})
    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const login = async (req, res) => {
    const{email,password}=req.body
    try {
        if(!email || !password){
            return res.status(400).json({message:"All fields Required"})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid eamil and password"})
        }
        const isPasswordCorrect=await user.matchPassword(password)
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid email or password"})
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production"
        })
        res.status(200).json({success:true,user})
    } catch (error) {
console.log("Error in login controller",error)
res.status(500).json({message:"Internal Server Error"})
    }
}

export const logout = async (req, res) => {

res.clearCookie("jwt")
res.status(200).json({success:true,message:"Logout Successfully"})
}