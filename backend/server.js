import express from "express";
import cors from "cors";

import { errorHandler, notFound } from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/task/task.route.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";

const app = express();

// Allow localhost (dev) + any Vercel-hosted frontend (all deployment URLs)
const ALLOWED_ORIGIN = /^(http:\/\/localhost:\d+|https:\/\/[\w-]+\.vercel\.app)$/;

app.use(cors({
  origin: function (origin, callback) {
    // Allow curl / mobile / same-origin requests (no origin header)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGIN.test(origin)) return callback(null, true);
    return callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
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