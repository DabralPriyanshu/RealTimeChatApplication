import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters " });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format " });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists " });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ fullName, password: hashedPassword, email });
    await generateToken(user._id, res);
    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
    //Todo->send a welcome mail to user
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
