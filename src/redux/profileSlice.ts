import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { axiosInstance } from "../utils/axiosInstance";
import { RootState } from "./store";

type IProfileSlice = {
  username: string;
  displayName: string;
  bio: string;
  avatar: string | null;
  loadingProfileDetails: boolean;
  error: string | null;
};

const initialState: IProfileSlice = {
  username: "",
  displayName: "",
  bio: "",
  avatar: null,
  loadingProfileDetails: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoadingProfileDetails: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingProfileDetails = payload;
    },
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },
    setDisplayName: (state, { payload }: PayloadAction<string>) => {
      state.displayName = payload;
    },
    setBio: (state, { payload }: PayloadAction<string>) => {
      state.bio = payload;
    },
    setAvatar: (state, { payload }: PayloadAction<string | null>) => {
      state.avatar = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loadingProfileDetails = true;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, { payload: { username, displayName, bio, avatar } }) => {
          state.username = username;
          state.displayName = displayName;
          state.bio = bio;
          state.avatar = avatar ?? "";
          state.loadingProfileDetails = false;
        }
      )
      .addCase(fetchUserData.rejected, (state) => {
        state.loadingProfileDetails = false;
        state.error = "An error occurred while fetching your user details";
      });
  },
});

export const fetchUserData = createAsyncThunk(
  `${profileSlice.name}/fetchProfileData`,
  async ({ token, id }: { token: string; id: string }) => {
    const { data } = await axiosInstance.get<IUser>(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const {
  setLoadingProfileDetails,
  setUsername,
  setDisplayName,
  setBio,
  setAvatar,
  setError,
} = profileSlice.actions;

export const selectLoadingProfileDetails = (state: RootState) =>
  state.profile.loadingProfileDetails;
export const selectUsername = (state: RootState) => state.profile.username;
export const selectDisplayName = (state: RootState) =>
  state.profile.displayName;
export const selectBio = (state: RootState) => state.profile.bio;
export const selectAvatar = (state: RootState) => state.profile.avatar;
export const selectError = (state: RootState) => state.profile.error;

export default profileSlice.reducer;
