import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { IUser } from "../types";
import type { Socket } from "socket.io-client";
import { IMessageToSend } from "../hooks/useChat";

type IReceivedMessage = {
  message: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
};
type IChat = {
  [otherUserId: string]: {
    details: IUser;
    messages: IReceivedMessage[];
  };
};
// chat currently opened in right side of app
type IOpenedChat = {
  isOpen: boolean;
  user: IUser | null;
};

// typing for whole slice
interface IChatSlice {
  initializedSocket: boolean;
  socket: Socket | null;
  error: string | null;
  isOnline: boolean;
  chats: IChat;
  open: IOpenedChat;
  recents: Map<string, IReceivedMessage>;
}

const initialState: IChatSlice = {
  initializedSocket: false,
  socket: null,
  error: null,
  isOnline: false,
  chats: {},
  open: {
    isOpen: false,
    user: null,
  },
  recents: new Map(),
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
    initializeSocket: (state, { payload }: PayloadAction<any>) => {
      state.socket = payload;
      state.initializedSocket = true;
    },
    removeSocket: (state) => {
      state.socket = null;
      state.initializedSocket = false;
    },
    receiveMessage: (state, {payload: {message,recipientId,senderId,_id,username,displayName,bio,dateJoined}}: PayloadAction<IMessageToSend>) => {
      const messageObject = {message,recipientId,senderId,timestamp: new Date().toISOString()};
      const detailsObject: IUser = {
        _id,
        username,
        displayName,
        bio,
        dateJoined,
      };
      if (state.chats.hasOwnProperty(senderId)) {
        state.chats[senderId].messages.push(messageObject);
        if (state.recents.has(senderId)) {
          state.recents.delete(senderId);
        }
        state.recents.set(senderId, messageObject);
      } else {
        state.chats[senderId] = {
          details: detailsObject,
          messages: [messageObject],
        };
        state.recents.set(senderId, messageObject);
      }
    },
    sendMessageAction: (
      state,
      {
        payload: {
          message,
          recipientId,
          senderId,
          _id,
          username,
          displayName,
          bio,
          dateJoined,
        },
      }: PayloadAction<IMessageToSend>
    ) => {
      const messageObject = {
        message,
        recipientId,
        senderId,
        timestamp: new Date().toISOString(),
      };
      const detailsObject: IUser = {
        _id,
        username,
        displayName,
        bio,
        dateJoined,
      };
      if (state.chats.hasOwnProperty(recipientId)) {
        state.chats[recipientId].messages.push(messageObject);
        if (state.recents.has(recipientId)) {
          state.recents.delete(recipientId);
        }
        state.recents.set(recipientId, messageObject);
      } else {
        state.chats[recipientId] = {
          details: detailsObject,
          messages: [messageObject],
        };
        state.recents.set(recipientId, messageObject)
      }
    },
  },
});

export const {
  connected,
  connectError,
  openChat,
  closeChat,
  initializeSocket,
  removeSocket,
  sendMessageAction,
  receiveMessage,
} = chatSlice.actions;

export const selectChatError = (state: RootState) => state.chat.error;
export const selectIsOnline = (state: RootState) => state.chat.isOnline;
export const selectChats = (state: RootState) => state.chat.chats;
export const selectHasOpenedChat = (state: RootState) => state.chat.open.isOpen;
export const selectOpenedChat = (state: RootState) => state.chat.open.user;
export const selectSocket = (state: RootState) => state.chat.socket;
export const selectInitializedSocket = (state: RootState) =>
  state.chat.initializedSocket;
export const selectChatsWithUser = (userId: string) => (state: RootState) =>
  state.chat.chats[userId];
export const selectRecentChats = (state: RootState) => state.chat.recents;

export default chatSlice.reducer;
