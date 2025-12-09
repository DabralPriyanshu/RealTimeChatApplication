import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`MONGODB Connected Successfully!!!`);
  } catch (error) {
    console.error("Error connection to MONGODB", error);
    process.exit(1);
  }
};
