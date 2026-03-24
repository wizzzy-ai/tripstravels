import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./db.js";

dotenv.config();
const isRender =
  Boolean(process.env.RENDER_SERVICE_ID) ||
  Boolean(process.env.RENDER_EXTERNAL_URL);

const envPort = process.env.PORT?.trim();
const PORT = envPort ? Number(envPort) : undefined;

if (!PORT) {
  if (isRender) {
    console.error(
      "PORT is missing on Render. Make sure this is a Render Web Service and you did not remove/override platform-provided PORT."
    );
    process.exit(1);
  }
}

console.log("Booting Trips & Travels API", {
  node: process.version,
  port: PORT ?? 3050,
  hasMongoUrl: Boolean(process.env.MONGO_URL),
  isRender,
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

process.on("SIGTERM", () => {
  console.error("Received SIGTERM (platform is stopping the service).");
});

async function main() {
  try {
    await connectDb();
    console.log("DB connected");

    const server = app.listen(PORT ?? 3050, () => {
      console.log(`Server is running on port ${PORT ?? 3050}`);
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
