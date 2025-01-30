import express from 'express';
import { userRoutes } from './routes/userRoutes'; // Adjust the path as necessary
import { connectDB } from './db';
import { categoryRoute } from './routes/categoryRoute'; // Adjust the path as necessary
import { reviewRoute } from './routes/reviewRoute';
import cors from 'cors';

const app = express();
const PORT = 5000;
connectDB()
//middleware
app.get("/", (req,res)=>{
  res.send("Backend is running");
});
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET, POST', 
    credentials: true, 
  }));

app.use(express.json());
app.use('/api',userRoutes)
app.use('/api',categoryRoute)
app.use("/api",reviewRoute)


app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}`))