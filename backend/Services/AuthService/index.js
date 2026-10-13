import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js'
import router from './routes/auth.route.js';

const app = express();
app.use(express.json());
app.use('/', router);


const port = process.env.PORT

app.get("/", (req, res) => {
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
