import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import router from '../AgentService/routes/agent.route.js'


const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use('/',router)

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