import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { IUser } from "../types";

interface IReceivedMessage {
  message: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
  delivered: boolean;
}
// chat currently opened in right side of app
type IOpenedChat = {
  isOpen: boolean;
  user: IUser | null;
};
interface IChat {
  error: string | null;
  isOnline: boolean;
  messages: IReceivedMessage[];
  open: IOpenedChat;
}

const initialState: IChat = {
  error: null,
  isOnline: false,
  messages: [],
  open: {
    isOpen: false,
    user: null,
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    connected: (state) => {
      state.error = null;
      state.isOnline = true;
    },
    connectError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isOnline = false;
    },
    openChat: (state, { payload }: PayloadAction<IUser>) => {
      state.open.isOpen = true;
      state.open.user = payload;
    },
    closeChat: (state) => {
      state.open.isOpen = false;
      state.open.user = null;
    },
  },
});

export const { connected, connectError, openChat, closeChat } =
  chatSlice.actions;

export const selectChatError = (state: RootState) => state.chat.error;
export const selectIsOnline = (state: RootState) => state.chat.isOnline;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectHasOpenedChat = (state: RootState) => state.chat.open.isOpen;
export const selectOpenedChat = (state: RootState) => state.chat.open.user;

export default chatSlice.reducer;