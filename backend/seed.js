import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import Tour from "./models/Tour.js";
import User from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Tour.deleteMany({});
    await User.deleteMany({});
    console.log("Existing data cleared");

    // Seed default admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const adminUser = new User({
      username: "admin",
      email: "admin@trips-travel.com",
      password: hashedPassword,
      photo: "/user-images/admin.jpg",
      role: "admin",
    });
    await adminUser.save();
    console.log("Admin user created");

    // Load real tour data from frontend
    const toursDataPath = path.join(__dirname, "../frontend/src/assets/data/tours.json");
    const toursData = JSON.parse(fs.readFileSync(toursDataPath, "utf-8"));

    // Seed tours
    for (const tourData of toursData) {
      // Remove _id to let Mongoose auto-generate ObjectId
      delete tourData._id;
      const tour = new Tour(tourData);
      await tour.save();
      console.log(`Tour "${tour.title}" created`);
    }

    console.log("Database seeded with real data successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
