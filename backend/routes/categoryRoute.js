"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
exports.categoryRoute = router;
router.get("/categories", categoryController_1.getCategories);
router.post("/categories", categoryController_1.createCategory);
router.delete("/categories/:categoryId", categoryController_1.deleteCategory);
router.post("/categories/addShop-to-category", categoryController_1.addShopToCategory);
