import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../shared/lib/axios";
import type { User, AuthResponse } from "../../../shared/types/api.types";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  token: savedToken,
  user: savedUser ? JSON.parse(savedUser) : null,
  isLoading: false,
  error: null,
  isAuthenticated: !!savedToken,
};

//Thunk googleLogin
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (credential: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/auth/gogle`, {
        credential,
      });
      return response.data.data as AuthResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Login gagal");
    }
  }
);

//Thunk getMe
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/auth/me");
      return response.data.data as User;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Gagal ambil data user");
    }
  }
);

// Auth Slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    //googleLogin
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        googleLogin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;

          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )

      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    //getMe
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
