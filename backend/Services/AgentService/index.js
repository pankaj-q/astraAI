import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
dotenv.config();

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    return res.status(200).json({
        message: "Agent service is running fine"
    })
})


connectDB()
.then(() => {
    app.listen(PORT, () => {
      console.log(`Agent Service is running on Port ${PORT}`);
    })
})
.catch((error) => {
    console.log(`error connecting in MongoDB ${error}`)
})