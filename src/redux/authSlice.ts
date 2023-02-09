import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { axiosInstance } from "../utils/axiosInstance";
import type { RootState } from "./store";
import type { ILoginCredentials, ISignupCredentials } from "../types";

interface IAuth {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
  id: string | null;
  error: string | null;
}
interface ITokenPayload {
  id: string;
  username: string;
}
interface ILoginResponse {
  token: string;
}

const initialState: IAuth = {
  isLoggedIn: Boolean(sessionStorage.getItem("token")) ?? false,
  token: sessionStorage.getItem("token") ?? null,
  username: sessionStorage.getItem("username") ?? null,
  id: sessionStorage.getItem("id") ?? null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.username = null;
      state.id = null;
      state.error = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("id");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(login.fulfilled, signup.fulfilled),
        (state, { payload }) => {
          const { username, id } = jwtDecode(payload) as ITokenPayload;
          state.isLoggedIn = true;
          state.token = payload;
          state.username = username;
          state.id = id;
          state.error = null;
          sessionStorage.setItem("token", payload);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("id", id);
        }
      )
      .addMatcher(isAnyOf(login.pending, signup.pending), (state) => {
        state.error = null;
      })
      .addMatcher(isAnyOf(login.rejected, signup.rejected), (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.username = null;
        state.id = null;
        state.error = "An error occurred while logging in";
      });
  },
});

export const login = createAsyncThunk(
  `${authSlice.name}/login`,
  async (credentials: ILoginCredentials) => {
    const {
      data: { token },
    } = await axiosInstance.post<ILoginResponse>("/auth/login", {
      ...credentials,
    });
    return token;
  }
);

export const signup = createAsyncThunk(
  `${authSlice.name}/signup`,
  async (credentials: ISignupCredentials) => {
    const {
      data: { token },
    } = await axiosInstance.post<ILoginResponse>("/auth/signup", {
      ...credentials,
    });
    return token;
  }
);

export const { logout } = authSlice.actions;

export const selectAuthIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUsername = (state: RootState) => state.auth.username;
export const selectAuthId = (state: RootState) => state.auth.id;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
