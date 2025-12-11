import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = async (userId, res) => {
  const token = await jwt.sign({ userId }, ENV.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
  return token;
};
