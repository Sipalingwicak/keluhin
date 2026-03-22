import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { AppError } from "../middleware/errorMiddleware";
import mongoose from "mongoose";

export const getCommentsById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      throw new AppError('"post tidak ditemukan', 404);
    }

    const comments = await Comment.find({ postId })
      .sort({ createdAt: 1 })
      .select("-__v");

    res.status(200).json(
      ApiResponse.success({
        comments,
        totalComments: comments.length,
      })
    );
  }
);

export const createComment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError("Kamu harus login untuk berkomentar", 401);
    }

    const postId = String(req.params.postId);
    const { content } = req.body;

    if (!content) {
      throw new AppError("Komentar gak boleh kosong", 400);
    }

    const post = await Post.findById(postId);

    if (!post) {
      throw new AppError("Keluhan tidak ditemukan", 404);
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new AppError("ID post tidak valid", 400);
    }

    const comment = await Comment.create({
      content,
      postId: new mongoose.Types.ObjectId(postId), // ← convert ke ObjectId
      userId: req.user._id,
      anonymousLabel: req.user.anonymousId,
    });

    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });

    res
      .status(201)
      .json(ApiResponse.success(comment, "Komentar berhasil ditambahkan!"));
  }
);

export const deleteComment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError("Kamu harus login unuk menghapus komentar", 401);
    }

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      throw new AppError("Komentar tidak ditemukan", 404);
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      throw new AppError("Kamu tidak berhak menghapus komentar ini", 403);
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    await Post.findByIdAndUpdate(comment.postId, {
      $inc: { commentsCount: -1 },
    });

    res
      .status(200)
      .json(ApiResponse.success(null, "Komentar berhasil dihapus"));
  }
);
