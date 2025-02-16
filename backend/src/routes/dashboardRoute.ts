import express from "express";
import { dashboard } from "../../src/controllers/dashboardController";

const router = express.Router();

router.get("/dashboard", dashboard);

export {router as dashboardRoute}