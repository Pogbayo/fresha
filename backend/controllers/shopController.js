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
exports.updateImgUrl = exports.updateAddress = exports.getShop = exports.createShop = void 0;
const CategorySchema_1 = require("../models/CategorySchema");
const CategorySchema_2 = require("../models/CategorySchema");
const createShop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, name, address, services, images, team, reviews, about, openingTimes } = req.body;
    try {
        const category = yield CategorySchema_2.Category.findById(categoryId);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
        }
        console.log(category);
        const newShop = new CategorySchema_1.Shop({
            name,
            address,
            category: categoryId,
            services,
            team,
            images,
            reviews,
            about,
            openingTimes,
        });
        yield newShop.save();
        category === null || category === void 0 ? void 0 : category.shops.push(newShop._id);
        yield (category === null || category === void 0 ? void 0 : category.save());
        // console.log("This is the newShop id",newShop._id)
        res.status(201).json({ message: "Shop created successfully", shop: newShop });
    }
    catch (error) {
        console.error("Error creating shop:", error);
        res.status(500).json({ message: "Error creating shop", error });
    }
});
exports.createShop = createShop;
const getShop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shopId } = req.params;
        const fetchedShop = yield CategorySchema_1.Shop.findById(shopId);
        if (!fetchedShop) {
            res.status(400).send("Shop not found");
        }
        res.status(200).send(fetchedShop);
    }
    catch (error) {
        res.status(500).send("Shop not found");
    }
});
exports.getShop = getShop;
const updateAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shopId } = req.params;
        const { address } = req.body;
        console.log(address);
        const updatedShop = yield CategorySchema_1.Shop.findByIdAndUpdate(shopId, { address }, { new: true, runValidators: true });
        if (!updatedShop) {
            res.status(400).send("Shop not found");
        }
        res.status(200).send(updatedShop === null || updatedShop === void 0 ? void 0 : updatedShop.address);
    }
    catch (error) {
        res.status(500).send((error));
    }
});
exports.updateAddress = updateAddress;
const updateImgUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shopId } = req.params;
        const { images } = req.body;
        console.log({ images });
        const updatedShop = yield CategorySchema_1.Shop.findByIdAndUpdate(shopId, { images }, { new: true, runValidators: true });
        if (!updatedShop) {
            res.status(404).send("Shop not found");
        }
        if ((updatedShop === null || updatedShop === void 0 ? void 0 : updatedShop.images.length) === 0 || images.length === 0) {
            res.status(400).send("No images provided or no changes made");
        }
        res.status(200).send(`${updatedShop === null || updatedShop === void 0 ? void 0 : updatedShop.name} image url(s) has been updated succeessfully`);
        // console.log(updatedShop)
    }
    catch (error) {
        res.status(500).send((error));
    }
});
exports.updateImgUrl = updateImgUrl;
