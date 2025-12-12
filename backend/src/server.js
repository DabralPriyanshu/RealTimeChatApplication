import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
const PORT = ENV.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
