import "dotenv/config";
import connectDB from "../config/db.js";
import app from "../server.js";

// Connect to MongoDB before handling any requests
await connectDB();

// Only listen if this file is run directly (not imported by Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`[DEBUG] Server running on http://localhost:${PORT}`);
  });
}

export default app;
