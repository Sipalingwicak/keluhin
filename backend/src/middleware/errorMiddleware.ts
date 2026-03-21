import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/ApiResponse";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  const message =
    process.env.NODE_ENV === "development"
      ? err.message
      : err instanceof AppError
        ? err.message
        : "Terjadi kesalahan pada server";

  console.error(`[ERROR] ${err.message}`, err.stack);

  res.status(statusCode).json(ApiResponse.error(message, statusCode));
};
