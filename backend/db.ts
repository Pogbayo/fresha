import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 
const MONGO_URL = process.env.MONGO_URL

export const connectDB = async () => {
    if (!MONGO_URL) {
        console.error("MONGO_URL is not defined in the environment variables");
        process.exit(1);
    }
    try {
        await mongoose.connect(MONGO_URL as string);
        console.log("Database connected successfully!");
    } catch(error){
        console.error("Database connection failed:", error);
        process.exit(1)
    }
}
