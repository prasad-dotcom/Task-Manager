import mongoose from "mongoose";

const connectDB = async () => {
    console.log("[DEBUG] Attempting to connect to MongoDB URI:", process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("[DEBUG] MongoDb connected");
        return true;
    } catch (error) {
        console.error("[DEBUG] DB Error:", error.message);
        // Don't exit - just throw error to be handled by caller
        throw error;
    }
};

export default connectDB;