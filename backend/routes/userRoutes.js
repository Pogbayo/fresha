"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
exports.userRoutes = router;
router.get("/users", userController_1.getUsers);
router.post("/users", userController_1.register);
router.post("/users/login", userController_1.login);
router.delete("/users", userController_1.deleteAccount);
router.post("/users/logout", userController_1.logout);
