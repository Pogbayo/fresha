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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.deleteAccount = exports.login = exports.register = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ "error": error });
    }
});
exports.getUsers = getUsers;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, phone } = req.body;
    try {
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "Email already in use" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.User({ firstname, lastname, email, password: hashedPassword, telephone: phone });
        yield newUser.save();
        res.status(200).json({ message: `user ${firstname} registered successfully!` });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield User_1.User.findOne({ email });
        if (!existingUser || !existingUser.password) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }
        const SECRET_KEY = process.env.JWT_SECRET;
        if (!SECRET_KEY) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({
            email: existingUser.email,
            firstname: existingUser.firstname,
            lastname: existingUser.lastname,
            telephone: existingUser.telephone
        }, SECRET_KEY, { expiresIn: "7d" });
        res.cookie("loginToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        res.status(200).json({ message: `Welcome back ${existingUser.firstname}`, token });
        console.log(token);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
    ;
});
exports.login = login;
const deleteAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(400).json({ error: "Unauthorized" });
            return;
        }
        const SECRET_KEY = process.env.JWT_SECRET;
        if (!SECRET_KEY) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const userEmail = decoded.email;
        const deletedUser = yield User_1.User.findOneAndDelete({ email: userEmail });
        if (!deletedUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteAccount = deleteAccount;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("loginToken", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        sameSite: "strict"
    });
    res.status(200).json({ message: "Logged out successfully!" });
});
exports.logout = logout;
