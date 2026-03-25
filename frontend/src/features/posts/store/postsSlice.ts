import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../shared/lib/axios";
import type { Post, Pagination } from "../../../shared/types/api.types";

interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  pagination: null,
  isLoading: false,
  error: null,
};

//get semua post
export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/posts?page=${page}`);
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Terjadi kesalahan");
    }
  }
);

//get Post by id
export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/posts/${postId}`);
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Terjadi kesalahan");
    }
  }
);

//create Post baru
export const createPost = createAsyncThunk(
  "posts/create",
  async (content: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/posts`, { content });
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Terjadi kesalahan");
    }
  }
);

//like post
export const likePost = createAsyncThunk(
  "posts/like",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`api/posts/${postId}/like`);
      return { postId, ...response.data.data };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Terjadi kesalahan");
    }
  }
);

//dislike post
export const dislikePost = createAsyncThunk(
  "posts/dislike",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/posts/${postId}/dislike`);
      return { postId, ...response.data.data };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Terjadi kesalahan");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },

  extraReducers: (builder) => {
    //fetch Posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (
          state,
          action: PayloadAction<{ posts: Post[]; pagination: Pagination }>
        ) => {
          state.isLoading = false;
          state.posts = action.payload.posts;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //fetch Post By Id
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.isLoading = false;
          state.selectedPost = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //create Post
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //like Post
    builder.addCase(likePost.fulfilled, (state, action) => {
      const post = state.posts.find((p) => p._id === action.payload.postId);
      if (post) {
        post.likes = Array(action.payload.likes).fill("");
        post.dislikes = Array(action.payload.dislikes).fill("");
      }
    });

    //dislike Post
    builder.addCase(dislikePost.fulfilled, (state, action) => {
      const post = state.posts.find((p) => p._id === action.payload.postId);
      if (post) {
        post.likes = Array(action.payload.likes).fill("");
        post.dislikes = Array(action.payload.dislikes).fill("");
      }
    });
  },
});

export const { clearError, clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
