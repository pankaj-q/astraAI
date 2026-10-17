import express from 'express'
import dotenv from 'dotenv'
import connectDB from '../AuthService/config/db.js';

dotenv.config();



const PORT = process.env.PORT
const app = express();

app.use(express.json())

app.get('/chat-service', (Req, res) => {
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
