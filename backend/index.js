import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/task/task.route.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";

const app = express();

// CORS Configuration - Allow frontend from any origin
const corsOptions = {
  origin: function (origin, callback) {
    // Allow all origins since frontend is on separate Vercel deployment
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check (doesn't need DB)
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// Middleware to connect DB before routes
let dbConnected = false;
app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error("[ERROR] DB Connection failed:", error.message);
      return res.status(500).json({ success: false, message: "Database connection failed" });
    }
  }
  next();
});

app.use("/api/auth",      authRoutes);
app.use("/api/tasks",     taskRoutes);
app.use("/api/analytics", analyticsRoutes);

// Register notFound as the last route handler
app.use(notFound);

// Register errorHandler as the last middleware (must have 4 args)
app.use((err, req, res, next) => {
  console.log("[DEBUG] Error handler called:", err);
  errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[DEBUG] Server running on http://localhost:${PORT}`);
});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[DEBUG] Server running on http://localhost:${PORT}`);
});