import express from "express";
import cors from "cors";

import { errorHandler, notFound } from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/task/task.route.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
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