import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/store/postsSlice";
import authReducer from "../features/auth/store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
