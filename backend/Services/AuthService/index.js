import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js'

const app = express();


const port = process.env.PORT

app.get("/auth-service", (req, res) => {
  res.json({
    message: "Auth service running on perfectly fine",
  });
});

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`AuthService is running on port ${port}`)
    });
})
.catch((error) => {
    console.error("Connection failed:", error);
})
