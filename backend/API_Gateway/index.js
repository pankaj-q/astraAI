import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();
import proxy from 'express-http-proxy';

const PORT = process.env.PORT
const app = express(); 

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use('/auth', proxy(process.env.AUTH_SERVICE));


app.get('/', (req, res)=> {
    res.json({
        message:"API gateway is running"
    })
})


app.listen(PORT,() => {
    console.log(`API Gateway running on port ${PORT}`)
})