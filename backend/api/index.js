import "dotenv/config";
import connectDB from "../config/db.js";
import app from "../server.js";

// Connect to MongoDB before handling any requests
await connectDB();

export default app;
