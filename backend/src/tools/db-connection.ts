import mongoose from "mongoose";

const dbCon = {
    async connectDB(): Promise<void> {
        const uri =
            "mongodb+srv://aleksandarristic_db_user:kzeg3091337@outfitfactory.nvliqpd.mongodb.net/OutfitFactory?retryWrites=true&w=majority&appName=OutfitFactory";
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
