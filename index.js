import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/UserRoutes.js";

dotenv.config()

const app = express();
const port = process.env.PORT | 8080
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));


app.get("/hcheck",(req,res)=>{
    res.send("Health check for backend working fine ...");
});
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

app.listen(port,()=>{
    console.log(`Backend is running on http://localhost:${port}`);
});