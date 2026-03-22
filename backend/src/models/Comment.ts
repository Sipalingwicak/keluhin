import mongoose, { Document, Schema } from "mongoose";

export interface IComment {
  content: string;
  postId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
  anonymousLabel: string;
}

export interface ICommentDocument extends IComment, Document {}

const CommentSchema = new Schema<ICommentDocument>(
  {
    content: {
      type: String,
      required: true,
      minlength: [1, "Komentar tidak boleh kosong"],
      maxlength: [150, "Komentar maksimal 500 karakter"],
      trim: true,
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    anonymousLabel: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

CommentSchema.index({ postId: 1 });

const Comment = mongoose.model<ICommentDocument>("Comment", CommentSchema);

export default Comment;
