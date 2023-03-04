import { configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import authSliceReducer from "./authSlice";
import chatSliceReducer, { openChat, receiveMessage, sendMessageAction } from "./chatSlice";
import sideBarReducer from "./sideBarSlice";
import profileReducer from "./profileSlice";
import { enableMapSet } from 'immer';
import { scrollDown } from "../utils/scrolldown";

enableMapSet();

const listenerMiddleWare = createListenerMiddleware();
listenerMiddleWare.startListening({
  matcher: isAnyOf(openChat, sendMessageAction, receiveMessage),
  effect: scrollDown,
});

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    chat: chatSliceReducer,
    sidebars: sideBarReducer,
    profile: profileReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).prepend(
      listenerMiddleWare.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
