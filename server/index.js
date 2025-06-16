import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import userRoutes from "./Routes/User.js"
import videoRoutes from "./Routes/Video.js";
import path from "path";
import commentRoutes from "./Routes/Comments.js";

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.get('/', (req, res) => {
      res.send("YouTube Clone is working!")
})
app.use(bodyParser.json())
const port = process.env.port || 5000
app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
})
app.use("/user", userRoutes)
app.use("/uploads", express.static(path.join("uploads")))
app.use("/video", videoRoutes)
app.use("/comment", commentRoutes)
const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL).then(() => {
      console.log("MongoDB Database Connected!")
}).catch((error) => {
      console.log(error)
})