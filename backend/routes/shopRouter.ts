import express from "express";
import { createShop, getShop, updateImgUrl } from "../controllers/shopController"; 

const router = express.Router();

router.post("/shops", createShop);  
router.put("/shops/:shopId",updateImgUrl);
router.get("/shops/:shopId",getShop);

export { router as shopRoute };
