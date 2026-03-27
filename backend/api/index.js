import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

// CORS Configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Basic health check - test this first
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// Lazy load modules only when needed
let authRoutesLoaded = false;
let taskRoutesLoaded = false;
let analyticsRoutesLoaded = false;

// Load routes on demand
const setupRoutes = async (app) => {
  try {
    if (!authRoutesLoaded) {
      const { default: connectDB } = await import("../config/db.js");
      const { default: authRoutes } = await import("../modules/auth/auth.routes.js");
      const { default: taskRoutes } = await import("../modules/task/task.route.js");
      const { default: analyticsRoutes } = await import("../modules/analytics/analytics.routes.js");
      
      // Try to connect DB once
      try {
        await connectDB();
        console.log("[DEBUG] Database connected");
      } catch (error) {
        console.error("[ERROR] DB Connection failed:", error.message);
      }
      
      app.use("/api/auth", authRoutes);
      app.use("/api/tasks", taskRoutes);
      app.use("/api/analytics", analyticsRoutes);
      
      authRoutesLoaded = true;
    }
  } catch (error) {
    console.error("[ERROR] Failed to load routes:", error.message);
  }
};

// Middleware to setup routes before handling requests
app.use(async (req, res, next) => {
  await setupRoutes(app);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Export for Vercel
export default app;
