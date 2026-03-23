import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./db.js";

dotenv.config();
const PORT = process.env.PORT || 3050;

console.log("Booting Trips & Travels API", {
  node: process.version,
  port: PORT,
  hasMongoUrl: Boolean(process.env.MONGO_URL),
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
  process.exitCode = 1;
  setTimeout(() => process.exit(1), 200);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exitCode = 1;
  setTimeout(() => process.exit(1), 200);
});

async function main() {
  try {
    await connectDb();
    console.log("DB connected");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on("error", (err) => {
      console.error("HTTP server error:", err);
      process.exitCode = 1;
      setTimeout(() => process.exit(1), 200);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exitCode = 1;
    setTimeout(() => process.exit(1), 200);
  }
}

main();
