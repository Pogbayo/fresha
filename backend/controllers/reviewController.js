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
exports.createReview = exports.getReviews = void 0;
const Review_1 = require("../models/Review");
const getReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review_1.Review.find();
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getReviews = getReviews;
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, title, description, city, country } = req.body;
    try {
        if (!name || !title || !description || !city || !country) {
            res.status(400).json({ message: "All fields are required" });
        }
        const newReview = new Review_1.Review({ name, title, description, city, country });
        yield newReview.save();
        res.status(200).json({ message: `Review uploaded successfully` });
    }
    catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ message: 'Error creating category', error: error.message || error });
    }
});
exports.createReview = createReview;
