import express from "express"
import { getCategories,createCategory, createShop, addShopToCategory } from "../controllers/categoryController"

const router = express.Router();

//Route to get all categories
router.get("/categories", getCategories);

//ROute to create or add a category
router.post("/categories", createCategory)

//Route to create shop
router.post("/categories",createShop)

//Route to addShop to categories
router.post("/categories",addShopToCategory)
export {router as categoryRoute}