import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "1234567890";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3d";