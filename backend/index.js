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
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const db_1 = require("./db");
const categoryRoute_1 = require("./routes/categoryRoute");
const reviewRoute_1 = require("./routes/reviewRoute");
const cors_1 = __importDefault(require("cors"));
const shopRouter_1 = require("./routes/shopRouter");
const deteteShop_1 = require("./routes/deteteShop");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dashboard_1 = require("./routes/dashboard");
const axios_1 = __importDefault(require("axios")); // 
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const PORT = 5000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        app.get("/", (req, res) => {
            res.send("Backend is running");
        });
        app.use((0, cors_1.default)({
            origin: 'http://localhost:5173',
            methods: 'GET, POS, DELETE',
            credentials: true,
        }));
        app.use(express_1.default.json());
        app.use("/api", userRoutes_1.userRoutes);
        app.use("/api", categoryRoute_1.categoryRoute);
        app.use("/api", reviewRoute_1.reviewRoute);
        app.use("/api", shopRouter_1.shopRoute);
        app.use("/api", deteteShop_1.deleteRoute);
        app.use("/api", dashboard_1.dashboardRoute);
        node_cron_1.default.schedule("*/1 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield axios_1.default.get(process.env.API_URL || "http://localhost:5000/");
                console.log("✅ API pinged to keep it alive!");
            }
            catch (error) {
                console.error("❌ Error pinging API:", error.message);
            }
        }));
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Error starting server:", error.message);
    }
});
startServer();
