import mongoose, { Document, Schema } from "mongoose";

export interface IPost {
  content: string;
  userId: mongoose.Types.ObjectId | null;
  anonymousLabel: String;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  commentsCount: number;
}

export interface IPostDocument extends IPost, Document {}

const PostSchema = new Schema<IPostDocument>(
  {
    content: {
      type: String,
      required: true,
      minLength: [0, "keluhin minimal 10 karakter ya"],
      maxLength: [300, "keluhin minimal 300 karakter ya"],
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    anonymousLabel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPostDocument>("Post", PostSchema);

export default Post;
