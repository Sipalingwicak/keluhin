import mongoose from "mongoose";
import { env } from "./env";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);

    console.log(`MongoDB terhubung: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Gagal terhubung ke MongoDB: ${error.message}`);
    }

    process.exit(1);
  }
};

export default connectDB;
