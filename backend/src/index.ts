import express from 'express';
import { userRoute } from './routes/userRoute'; 
import { reviewRoute } from './routes/reviewRoute'; 
import { shopRoute } from './routes/shopRoute'; 
import { deleteShopRoute } from './routes/deteteShopRoute';  
import { dashboardRoute } from './routes/dashboardRoute'; 
import {categoryRoute} from './routes/categoryRoute'; 
import axios from "axios";  
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from './db'; 
import cron from "node-cron";
import debug from 'debug';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const log = debug('app');
app.use(cookieParser()); 

const PORT = 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.get("/", (req, res) => {
      res.send("Backend is running");
    });

    app.use(cors({
      origin: 'http://localhost:5173',
      methods: 'GET, POST, DELETE',
      credentials: true,
    }));

    app.use(express.json());
    app.use("/api", userRoute);
    app.use("/api", categoryRoute);
    app.use("/api", reviewRoute);
    app.use("/api", shopRoute);
    app.use("/api", deleteShopRoute);
    app.use("/api", dashboardRoute);
    
    cron.schedule("*/1 * * * *", async () => {
      try {
        await axios.get(process.env.API_URL || "http://localhost:5000/");
        console.log("✅ API pinged to keep it alive!");
      } catch (error) {
        console.error("❌ Error pinging API:", (error as Error).message);
      }
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", (error as Error).message);
  }
};

startServer();
