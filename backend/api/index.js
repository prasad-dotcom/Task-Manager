import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

// CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// Middleware to load routes on first request
let routesLoaded = false;

const loadRoutes = async () => {
  if (routesLoaded) return;
  
  try {
    console.log("[DEBUG] Loading dependencies...");
    
    // Import database
    const { default: connectDB } = await import("../config/db.js");
    console.log("[DEBUG] connectDB imported");
    
    // Import routes
    const { default: authRoutes } = await import("../modules/auth/auth.routes.js");
    const { default: taskRoutes } = await import("../modules/task/task.route.js");
    const { default: analyticsRoutes } = await import("../modules/analytics/analytics.routes.js");
    console.log("[DEBUG] Routes imported");
    
    // Connect to database
    try {
      await connectDB();
      console.log("[DEBUG] Database connected");
    } catch (dbError) {
      console.error("[ERROR] Database connection failed:", dbError.message);
    }
    
    // Register routes
    app.use("/api/auth", authRoutes);
    app.use("/api/tasks", taskRoutes);
    app.use("/api/analytics", analyticsRoutes);
    console.log("[DEBUG] Routes registered");
    
    routesLoaded = true;
  } catch (error) {
    console.error("[ERROR] Failed to load routes:", error.message);
    console.error(error.stack);
  }
};

// Load routes middleware
app.use(async (req, res, next) => {
  await loadRoutes();
  next();
});

// Error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
