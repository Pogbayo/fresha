import express from "express";
import { getCategories, createCategory, addShopToCategory, deleteCategory } from "../controllers/categoryController";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.delete("/categories/:categoryId", deleteCategory);
router.post("/categories/addShop-to-category", addShopToCategory);

export {router as categoryRoute}