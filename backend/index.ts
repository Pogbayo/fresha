import express from 'express';
import { userRoutes } from './routes/userRoutes';
import { connectDB } from './db';
import { categoryRoute } from './routes/categoryRoute';
import { reviewRoute } from './routes/reviewRoute';
import cors from 'cors';
import { shopRoute } from './routes/shopRouter';
import { Category } from './models/CategorySchema';
import { deleteRoute } from './routes/deteteShop';

const app = express();
const PORT = 5000;

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Middleware
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

    const category = await Category.findById("679bc41a240d6de7bbf32c6f");
    // console.log("Fetched Category:", category);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
