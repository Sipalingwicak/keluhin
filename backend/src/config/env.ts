import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  NODE_ENV: "development" | "production" | "test";
}

const REQUIRED_ENV_VARS = [
  "MONGO_URI",
  "JWT_SECRET",
  "GOOGLE_CLIENT_ID",
] as const;

for (const envVar of REQUIRED_ENV_VARS) {
  if (!process.env[envVar]) {
    throw new Error(
      `Environment variable "${envVar}" wajib diisi dalam file .env`
    );
  }
}

export const env = {
  PORT: process.env.PORT || "5000",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  NODE_ENV: process.env.NODE_ENV || "development",
} as EnvConfig;
