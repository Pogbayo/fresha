import express from 'express';
import { userRoutes } from './routes/userRoutes.js'; 
import { connectDB } from './db.js'; 
import { reviewRoute } from './routes/reviewRoute.js'; 
import cors from 'cors';
import { shopRoute } from './routes/shopRouter.js'; 
import { deleteRoute } from './routes/deteteShop.js'; 
import cookieParser from "cookie-parser";
import { dashboardRoute } from './routes/dashboard.js'; 
import axios from "axios";  
import categoryRoute from "./routes/categoryRoute.js"; // ✅ Default Import

import cron from "node-cron";

dotenv.config();


import dotenv from "dotenv";
dotenv.config();
const app = express();
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
      methods: 'GET, POS, DELETE',
      credentials: true,
    }));

    app.use(express.json());
    app.use("/api", userRoutes);
    app.use("/api", categoryRoute);
    app.use("/api", reviewRoute);
    app.use("/api", shopRoute);
    app.use("/api", deleteRoute);
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
