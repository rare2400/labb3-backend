import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    // Use connection string from environment variable and log success message
    await mongoose.connect(process.env.DATABASE as string);
    console.log("Connected to MongoDB");
  } catch (err) {
    // Log connection errors and exit process
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};