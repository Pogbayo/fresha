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
exports.addShopToCategory = exports.deleteCategory = exports.createCategory = exports.getCategories = void 0;
const CategorySchema_1 = require("../models/CategorySchema");
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield CategorySchema_1.Category.find()
            .populate({
            path: "shops",
            populate: {
                path: "services",
                populate: {
                    path: "subservices",
                }
            }
        });
        res.status(200).json({ categories });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: `Server error`, error });
    }
});
exports.getCategories = getCategories;
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const existingCategory = yield CategorySchema_1.Category.findOne({ name });
        if (existingCategory) {
            res.status(409).json({ message: "Category already exists" });
            return;
        }
        const newCategory = new CategorySchema_1.Category({ name });
        yield newCategory.save();
        res.status(200).json({ message: 'Category created successfully', newCategory });
    }
    catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ message: 'Error creating category', error: error.message || error });
    }
});
exports.createCategory = createCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    console.log(categoryId);
    try {
        const category = yield CategorySchema_1.Category.findByIdAndDelete(categoryId);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: `Category with ${category === null || category === void 0 ? void 0 : category.name} has been deleted` });
    }
    catch (error) {
        console.error("Error deleting category", error);
        res.status(500).json({ message: "Error deleting category" });
    }
});
exports.deleteCategory = deleteCategory;
const addShopToCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, shopId } = req.body;
    try {
        const category = yield CategorySchema_1.Category.findById(categoryId);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
        }
        const shop = yield CategorySchema_1.Shop.findById(shopId);
        if (!shop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        category === null || category === void 0 ? void 0 : category.shops.push(shopId);
        yield (category === null || category === void 0 ? void 0 : category.save());
        res.status(200).json({ message: "Shop added to category successfully", category });
    }
    catch (error) {
        console.error("Error adding shop to category:", error);
        res.status(500).json({ message: "Error adding shop to category", error: error.message || error });
    }
});
exports.addShopToCategory = addShopToCategory;
