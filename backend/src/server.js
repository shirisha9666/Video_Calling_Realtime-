import express from "express";
import dontenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import { connectDb } from "./lib/Db.js";
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"
dontenv.config()

const app = express()
const __dirname = path.resolve()
const PORT = process.env.PORT || 5001
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))



app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`)
  connectDb()
})