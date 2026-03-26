import express from "express";
import { getAnalytics } from "./analytics.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAnalytics);

export default router;