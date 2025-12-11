import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DB_URL);
    console.log(`MONGODB Connected Successfully!!!`);
  } catch (error) {
    console.error("Error connection to MONGODB", error);
    process.exit(1);
  }
};
