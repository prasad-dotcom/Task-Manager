import express from "express";
import cors from "cors";

import { errorHandler, notFound } from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/task/task.route.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";

const app = express();

// Allow both local and Vercel frontend URLs for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://task-manager-frontend-eight-tawny.vercel.app"
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/api/auth",      authRoutes);
app.use("/api/tasks",     taskRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;