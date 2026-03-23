import mongoose from "mongoose";

let isConnected = false;

export async function connectDb() {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not set");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  isConnected = true;
}
