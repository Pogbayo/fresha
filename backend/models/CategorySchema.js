"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.Shop = exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subServiceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true
    },
});
const addressSchema = new mongoose_1.default.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
const serviceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    subServices: { type: [subServiceSchema], required: true }
});
const shopSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    address: [{ type: addressSchema, required: true }],
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category", required: true },
    services: { type: [serviceSchema], required: true },
    images: { type: [String], required: true },
    team: [
        {
            name: { type: String, required: true },
            role: { type: String, required: true },
        },
    ],
    reviews: [
        {
            name: { type: String, required: true }
        },
        {
            comment: { type: String, required: true }
        }
    ],
    about: { type: String, required: true },
    openingTimes: {
        monday: { type: String, required: true },
        tuesday: { type: String, required: true },
        wednesday: { type: String, required: true },
        thursday: { type: String, required: true },
        friday: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true },
    },
});
const categorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    shops: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Shop" }],
});
exports.Category = mongoose_1.default.model("Category", categorySchema);
exports.Shop = mongoose_1.default.model("Shop", shopSchema);
exports.Service = mongoose_1.default.model("Service", serviceSchema);
