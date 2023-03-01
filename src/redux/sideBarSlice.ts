import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type ISideBars = {
  profileSideBarOpen: boolean;
  newChatSideBarOpen: boolean;
  chatDetailsSideBarOpen: boolean;
};

const initialState: ISideBars = {
  profileSideBarOpen: false,
  newChatSideBarOpen: false,
  chatDetailsSideBarOpen: false,
};

const sideBarsSlice = createSlice({
  name: "sidebars",
  initialState,
  reducers: {
    openProfile: (state) => {
      state.profileSideBarOpen = true;
    },
    closeProfile: (state) => {
      state.profileSideBarOpen = false;
    },
    openNewChat: (state) => {
      state.newChatSideBarOpen = true;
    },
    closeNewChat: (state) => {
      state.newChatSideBarOpen = false;
    },
    openChatDetails: (state) => {
      state.chatDetailsSideBarOpen = true;
    },
    closeChatDetails: (state) => {
      state.chatDetailsSideBarOpen = false;
    },
  },
});

export const {
  openProfile,
  closeProfile,
  openNewChat,
  closeNewChat,
  openChatDetails,
  closeChatDetails,
} = sideBarsSlice.actions;

export const selectIsProfileSideBarOpen = (state: RootState) => state.sidebars.profileSideBarOpen
export const selectIsNewChatSideBarOpen = (state: RootState) => state.sidebars.newChatSideBarOpen
export const selectIsChatDetailsOpen = (state: RootState) => state.sidebars.chatDetailsSideBarOpen

export default sideBarsSlice.reducer;
