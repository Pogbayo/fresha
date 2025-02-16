// 679c040f902673ace6f23d7f
import express from "express";
import { deleteShop } from "../controllers/deleteShopController";

const router = express.Router();

router.delete("/categories/:categoryId/shop/:shopId", deleteShop);

export { router as deleteShopRoute };
