import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import User from "../models/User";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { AppError } from "../middleware/errorMiddleware";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });
};

const generateAnonymId = (): string => {
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `Anonim ${randomNum}`;
};

export const googleLogin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { credential } = req.body;

    if (!credential) {
      throw new AppError("Google credential tidak ditemukan", 400);
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      throw new AppError("Data Google tidak valid", 400);
    }

    const { sub: googleId, email } = payload;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        googleId,
        email,
        anonymId: generateAnonymId(),
      });
    }

    const token = generateToken(user._id.toString());

    res.status(200).json(
      ApiResponse.success(
        {
          token,
          user: {
            anonymId: user.anonymId,
            email: user.email,
          },
        },
        "Login berhasil!"
      )
    );
  }
);

export const getMe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError("User tidak ditemukan", 401);
    }

    res.status(200).json(
      ApiResponse.success({
        anonymId: req.user.anonymId,
        email: req.user.email,
      })
    );
  }
);
