import express, { Router } from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from "./config/db.js";
import router from './routes/chat.route.js';

const PORT = process.env.PORT
const app = express();

app.use(express.json())
app.use('/', Router)

app.get('/', (Req, res) => {
    return res.status(200).json({
        message: "chat service is live now"
    })
})

connectDB()
.then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Chat Service is running on port ${PORT}`);
    });
})
.catch((error) =>{
    console.error("Mongo DB connection failed", error)
    process.exit(1);
})
