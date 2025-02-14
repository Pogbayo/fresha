"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRoute = void 0;
const express_1 = __importDefault(require("express"));
const shopController_1 = require("../controllers/shopController");
const router = express_1.default.Router();
exports.shopRoute = router;
router.post("/shops", shopController_1.createShop);
router.put("/shops/:shopId", shopController_1.updateImgUrl);
router.get("/shops/:shopId", shopController_1.getShop);
router.put("/shops/update-address/:shopId", shopController_1.updateAddress);
