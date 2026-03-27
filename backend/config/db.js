import mongoose from "mongoose";


const connectDB = async () => {
    console.log("[DEBUG] Attempting to connect to MongoDB URI:", process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("[DEBUG] MongoDb connected");
    } catch (error) {
        console.log("[DEBUG] DB Error:", error.message);
        process.exit(1);
    }
};


export default connectDB;