import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware";
import { env } from "./config/env";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.get("/test-direct", (req, res) => {
  // console.log("TEST DIRECT HIT");

  res.json({ message: "direct route bekerja!" });

  app.use(
    cors({
      origin:
        env.NODE_ENV === "production"
          ? "https://keluhin.vercel.app"
          : "http://localhost:5173",
      credentials: true,
    })
  );
});

app.use(express.json());
// console.log("Registering routes");

app.use("/api/auth", authRoutes);
// console.log("Auth routes registered");

app.use("/api/posts", postRoutes);

app.use("/api/comments", commentRoutes);

// app.use("/api/posts", require("./routes/postRoutes"));
// app.use("/api/comments", require("./routes/commentRoutes"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", environment: env.NODE_ENV });
});

app.use(errorHandler);

export default app;
