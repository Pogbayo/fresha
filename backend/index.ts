import express from 'express';
import { userRoutes } from './routes/userRoutes';
import { connectDB } from './db';
import { categoryRoute } from './routes/categoryRoute';
import { reviewRoute } from './routes/reviewRoute';
import cors from 'cors';
import { shopRoute } from './routes/shopRouter';
import { deleteRoute } from './routes/deteteShop';
import cookieParser from "cookie-parser";
import { dashboardRoute } from './routes/dashboard';

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
      methods: 'GET, POST',
      credentials: true,
    }));

    app.use(express.json());
    app.use("/api", userRoutes);
    app.use("/api", categoryRoute);
    app.use("/api", reviewRoute);
    app.use("/api", shopRoute);
    app.use("/api", deleteRoute);
    app.use("/api", dashboardRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
