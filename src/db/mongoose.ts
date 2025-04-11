import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_URI}`);
        console.log("Connected to database ✅");
    } catch(error) {
        console.log("Error connecting to database ❌", error);
        process.exit(1);
    }
}