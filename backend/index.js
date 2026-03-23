import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./db.js";

dotenv.config();
const PORT = process.env.PORT || 3050;

connectDb()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exitCode = 1;
  });
