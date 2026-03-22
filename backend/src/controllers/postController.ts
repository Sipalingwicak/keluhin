import { Request, Response } from "express";
import Post from "../models/Post";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { AppError } from "../middleware/errorMiddleware";

export const getAllPosts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v"),

      Post.countDocuments(),
    ]);

    res.status(200).json(
      ApiResponse.success({
        posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalPosts / limit),
          totalPosts,
          hasNextPage: page < Math.ceil(totalPosts / limit),
          hasPrevPage: page > 1,
        },
      })
    );
  }
);

export const getPostById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const post = await Post.findById(req.params.id).select("-__v");

    if (!post) {
      throw new AppError("Post tidak ditemukan", 404);
    }

    res.status(200).json(ApiResponse.success(post));
  }
);

export const createPost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { content } = req.body;
    if (!content) {
      throw new AppError("gak ada yang dikeluhin", 400);
    }

    const anonymousLabel = req.user
      ? req.user.anonymousId
      : `Anonim#${Math.floor(Math.random() * 9000) + 1000}`;

    const post = await Post.create({
      content,
      userId: req.user ? req.user._id : null,
      anonymousLabel,
    });

    res
      .status(200)
      .json(ApiResponse.success(post, "Keluhan berhasil diposting!"));
  }
);

export const likePost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError("Kamu harus login untuk like post", 401);
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new AppError("Post tidak ditemukan", 404);
    }

    const userId = req.user._id;

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.likes.push(userId);

      post.dislikes = post.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }

    await post.save();

    res.status(200).json(
      ApiResponse.success({
        likes: post.likes.length,
        dislikes: post.dislikes.length,
        isLiked: !alreadyLiked,
      })
    );
  }
);

export const dislikePost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError("Kamu harus login untuk dislike post", 401);
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new AppError("Post tidak ditemukan", 404);
    }

    const userId = req.user._id;

    const alreadyDisliked = post.dislikes.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyDisliked) {
      post.dislikes = post.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.dislikes.push(userId);

      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }

    await post.save();

    res.status(200).json(
      ApiResponse.success({
        likes: post.likes.length,
        dislikes: post.dislikes.length,
        isDisliked: !alreadyDisliked,
      })
    );
  }
);
