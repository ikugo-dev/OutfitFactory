import mongoose from "mongoose";
import "dotenv/config";

const dbCon = {
    async connectDB(): Promise<void> {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error(); //("MONGO_URI is not defined in .env");
        }
        try {
            await mongoose.connect(uri);
            console.log("Connected to MongoDB");
        } catch (err: any) {
            console.error("Failed to connect to MongoDB:", err);
            process.exit(1);
        }
    },
};

module.exports = dbCon;
