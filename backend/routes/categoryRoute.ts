import express from "express"
import { getCategories,createCategory, addShopToCategory, deleteCategory } from "../controllers/categoryController"

const router = express.Router();

//Route to get all categories
router.get("/categories", getCategories);

//ROute to create or add a category
router.post("/categories", createCategory,)

router.delete("/categories",deleteCategory)

//Route to addShop to categories
router.post("/categories/addShop-to-category",addShopToCategory)
export {router as categoryRoute}