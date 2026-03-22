import { Router } from "express";
import {
  getCommentsById,
  createComment,
  deleteComment,
} from "../controllers/commentController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/:postId", getCommentsById);

router.post("/:postId", protect, createComment);

router.delete("/:commentId", protect, deleteComment);

export default router;
