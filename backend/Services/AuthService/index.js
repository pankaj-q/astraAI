import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT
const app = express();

app.get('/auth-service', (req, res) =>{
    res.json({
        message: "Auth service running on perfectly fine"
    })
})



app.listen(port,() => {
    console.log(`AuthService running on port ${port}`)
})