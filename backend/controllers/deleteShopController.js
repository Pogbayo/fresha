"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShop = void 0;
const CategorySchema_1 = require("../models/CategorySchema");
const CategorySchema_2 = require("../models/CategorySchema");
const deleteShop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, shopId } = req.params;
    try {
        console.log("Received Category ID:", categoryId);
        const category = yield CategorySchema_1.Category.findById(categoryId);
        console.log("Category found:", category);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        category.shops = category.shops.filter((id) => id.toString() !== shopId);
        yield category.save();
        const shop = yield CategorySchema_2.Shop.findByIdAndDelete(shopId);
        if (shop) {
            res.status(200).json({ message: `Shop with name: ${shop.name} deleted successfully` });
        }
        else {
            res.status(404).json({ message: "Shop not found" });
        }
    }
    catch (error) {
        console.error("Error deleting shop:", error);
        return res.status(500).json({ message: "Error deleting shop", error });
    }
});
exports.deleteShop = deleteShop;
