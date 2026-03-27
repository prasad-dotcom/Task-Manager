import app from "../index.js";

// Export app for Vercel serverless functions
// Database connection will happen on first request via middleware
export default app;
