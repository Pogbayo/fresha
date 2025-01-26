import express from 'express';
import { userRoutes } from './routes/userRoutes'; // Adjust the path as necessary
import mongoose from 'mongoose';
import { connectDB } from './db';
const app = express();
const PORT = 6000;
connectDB()
//middleware
app.use(express.json());
app.use('/api',userRoutes)
app.get("/", (req,res)=>{
    res.send("Backend is running");
});
app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}`))