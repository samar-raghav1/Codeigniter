import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import teacherRoute from "./routes/teacherRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

dotenv.config();
const port=4000;
app.use(cookieParser())
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoute)
app.use('/users',userRoute)
app.use('/teachers',teacherRoute)
app.get("/",(req,res)=>{
   res.send("Hello world!")
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    
});