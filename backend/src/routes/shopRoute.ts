import express from "express";
import { createShop, getShop, updateAddress, updateImgUrl } from "@controllers/shopController"; 

const router = express.Router();

router.post("/shops", createShop);  
router.put("/shops/:shopId",updateImgUrl);
router.get("/shops/:shopId",getShop);
router.put("/shops/:shopId/update-address", updateAddress);

export { router as shopRoute };
