import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import User from "../models/User";
import { AppError } from "./errorMiddleware";
import asyncHandler from "../utils/asyncHandler";

interface JwtPayload {
  userId: String;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Kamu harus login untuk mengakses ini", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError("User tidak ditemukan", 401);
    }

    req.user = user;

    next();
  }
);
