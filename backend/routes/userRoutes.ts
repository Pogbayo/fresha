import express from "express"
import { createUser, getUsers } from "../controllers/userController";

const router = express.Router();

//ROute to get all users
router.get("/users",getUsers);

//ROute to create a user
router.post("/users",createUser)
export { router as userRoutes };
