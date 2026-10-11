import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT
const app = express();

app.get('/api-gateway', (req, res)=> {
    res.json({
        message:"API gateway is running"
    })
})


app.listen(PORT,() => {
    console.log(`API Gateway running on port ${PORT}`)
})