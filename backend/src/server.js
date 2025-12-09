import express from "express";
import dotenv from "dotenv";
dotenv.config({ quite: true });
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
const app = express();
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is live" });
});
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
