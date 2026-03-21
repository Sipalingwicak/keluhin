import { Router } from "express";
import { googleLogin, getMe } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

console.log("authRoutes.ts loaded...");

const router = Router();

console.log("router created");

router.get("/test", (req, res) => {
  console.log("Test route hit!");

  res.json({ message: "auth router bekerja!" });
});

router.post("/google", googleLogin);
router.get("/me", protect, getMe);

export default router;
