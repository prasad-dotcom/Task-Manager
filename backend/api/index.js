import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "../config/db.js";
import { errorHandler, notFound } from "../middleware/error.middleware.js";
import authRoutes from "../modules/auth/auth.routes.js";
import taskRoutes from "../modules/task/task.route.js";
import analyticsRoutes from "../modules/analytics/analytics.routes.js";

const app = express();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// DB connection pool
let dbConnected = false;
app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error("[ERROR] DB Connection failed:", error.message);
    }
  }
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error handling
app.use(notFound);
app.use((err, req, res, next) => {
  console.log("[DEBUG] Error handler called:", err);
  errorHandler(err, req, res, next);
});

// Export for Vercel
export default app;
