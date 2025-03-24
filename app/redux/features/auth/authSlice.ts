import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setAuth, logout, finishInitialLoad, setUser, setError } =
  authSlice.actions;
export default authSlice.reducer;
