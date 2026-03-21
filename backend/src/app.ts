import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware";
import { env } from "./config/env";
import { encapsulate } from "crypto";

const app = express();

app.use(
  cors({
    origin:
      env.NODE_ENV === "production"
        ? "https://keluhin.vercel.app"
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/posts", require("./routes/postRoutes"));
// app.use("/api/comments", require("./routes/commentRoutes"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", environment: env.NODE_ENV });
});

app.use(errorHandler);

export default app;
