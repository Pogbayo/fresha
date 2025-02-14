"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoute = void 0;
// 679c040f902673ace6f23d7f
const express_1 = __importDefault(require("express"));
const deleteShopController_1 = require("../controllers/deleteShopController");
const router = express_1.default.Router();
exports.deleteRoute = router;
router.delete("/categories/:categoryId/shop/:shopId", deleteShopController_1.deleteShop);
