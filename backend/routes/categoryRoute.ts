import express from "express"
import { getCategories,createCategory } from "../controllers/categoryController"

const router = express.Router();

//Route to get all categories
router.get("/categories", getCategories);

//ROute to create or add a category
router.post("/categories", createCategory)
export {router as categoryRoute}