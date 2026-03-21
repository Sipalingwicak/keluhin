import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  likePost,
  dislikePost,
} from "../controllers/postController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", createPost);

router.put("/:id/like", protect, likePost);

router.put("/:id/dislike", protect, dislikePost);

export default router;
