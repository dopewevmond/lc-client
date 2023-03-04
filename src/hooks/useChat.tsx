import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectAuthId } from "../redux/authSlice";
import {
  selectIsOnline,
  selectOpenedChat,
  selectSocket,
  sendMessageAction,
} from "../redux/chatSlice";
import { IUser } from "../types";
import {
  selectBio,
  selectDisplayName,
  selectUsername,
} from "../redux/profileSlice";

type IMessage = {
  message: string;
  recipientId: string;
};

export type IMessageToSend = IMessage &
  IUser & {
    senderId: string;
  };

export const useChat = () => {
  const socket = useAppSelector(selectSocket);
  const isOnline = useAppSelector(selectIsOnline);
  const userId = useAppSelector(selectAuthId);
  const username = useAppSelector(selectUsername);
  const displayName = useAppSelector(selectDisplayName);
  const bio = useAppSelector(selectBio);
  const openChatDetails = useAppSelector(selectOpenedChat);
  const dispatch = useAppDispatch();

  const sendMessage = (msgBody: IMessage) => {
    if (!socket || !userId || !openChatDetails) return;
    const recipientDetails: IUser = { ...openChatDetails };
    const senderDetails: IUser = {
      _id: userId,
      username,
      displayName,
      bio,
      dateJoined: "",
    };
    dispatch(
      sendMessageAction({ ...msgBody, ...recipientDetails, senderId: userId })
    );
    socket.emit("sendMessage", {
      ...msgBody,
      ...senderDetails,
      senderId: userId,
    });
  };

  return {
    isOnline,
    sendMessage,
  };
};
