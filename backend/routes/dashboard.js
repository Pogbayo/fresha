"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoute = void 0;
const express_1 = __importDefault(require("express"));
const dashboardController_1 = require("../controllers/dashboardController");
const router = express_1.default.Router();
exports.dashboardRoute = router;
router.get("/dashboard", dashboardController_1.dashboard);
