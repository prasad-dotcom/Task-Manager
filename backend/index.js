import dotenv from "dotenv";
import app from "./server.js";
import connectDB from "./config/db.js";


dotenv.config();

connectDB();

console.log("app:", app);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});