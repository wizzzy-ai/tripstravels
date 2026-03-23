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

  await mongoose.connect(mongoUrl);
  isConnected = true;
}

