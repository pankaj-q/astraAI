import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();
import proxy from 'express-http-proxy';
import protect from './middleware/auth.middleware.js';
import { getCurrentUser } from './controllers/user.controller.js';
import { proxyHeader } from './utils/proxyHeader.js';
import morgan from 'morgan';

const PORT = process.env.PORT
const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/chat",protect,proxyHeader(process.env.CHAT_SERVICE));
app.use("/api/agent", protect, proxy(process.env.AGENT_SERVICE));
app.get('/api/me', protect,getCurrentUser)

app.get('/', (req, res)=> {
    res.json({
        message:"API gateway is running"
    })
})


app.listen(PORT,() => {
    console.log(`API Gateway running on port ${PORT}`)
})