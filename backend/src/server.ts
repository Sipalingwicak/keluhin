import app from "./app";
import connectDB from "./config/db";
import { env } from "./config/env";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(Number(env.PORT), () => {
    console.log(`Server berjalan di http://localhost:${env.PORT}`);
    console.log(`Mode: ${env.NODE_ENV}`);
  });
};

startServer().catch((error: Error) => {
  console.error("Gagal menjalankan server:", error.message);
  process.exit(1);
});
