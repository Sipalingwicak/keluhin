import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../shared/lib/axios";
import type { Comment } from "../../../shared/types/api.types";

interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

// fetch all comments
export const fetchComments = createAsyncThunk(
  "comments/fetchById",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/comments/${postId}`);
      return response.data.data.comments as Comment[];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal ambil komentar");
    }
  }
);

// create comment
export const createComment = createAsyncThunk(
  "comments/create",
  async (
    { postId, content }: { postId: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`/api/comments/${postId}`, {
        content,
      });
      return response.data.data as Comment;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal berkomentar");
    }
  }
);

// delete comment
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (commentId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/comments/${commentId}`);
      return commentId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal menghapus komentar");
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: (state) => {
      (state.comments = []), (state.error = null);
    },
  },
  // fetch Comments
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          (state.isLoading = false), (state.comments = action.payload);
        }
      )
      .addCase(fetchComments.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload as string);
      });

    // createComment
    builder
      .addCase(createComment.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.isLoading = false;
          state.comments.push(action.payload);
        }
      )
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //deleteComment
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      }
    );
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
