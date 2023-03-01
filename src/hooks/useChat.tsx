import { useAppSelector } from "../redux/store";
import { selectAuthId } from "../redux/authSlice";
import {
  selectChatError,
  selectIsOnline,
  selectMessages,
  selectSocket,
} from "../redux/chatSlice";

interface IMessage {
  message: string;
  recipientId: string;
}

interface IMessageToSend extends IMessage {
  senderId: string;
}

export const useChat = () => {
  const socket = useAppSelector(selectSocket);
  const messages = useAppSelector(selectMessages);
  const error = useAppSelector(selectChatError);
  const isOnline = useAppSelector(selectIsOnline);
  const userId = useAppSelector(selectAuthId);

  const sendMessage = (msgBody: IMessage) => {
    if (!socket || !userId) return;
    const msg: IMessageToSend = { ...msgBody, senderId: userId };
    console.log(msg);
    socket.emit("sendMessage", msg);
  };

  return {
    error,
    isOnline,
    messages,
    sendMessage,
  };
};
