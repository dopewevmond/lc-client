import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectAuthId, selectAuthToken } from "../redux/authSlice";
import { io, type Socket } from "socket.io-client";
import {
  connected,
  connectError,
  selectChatError,
  selectIsOnline,
  selectMessages,
} from "../redux/chatSlice";

interface IMessage {
  message: string;
  recipientId: string;
}

interface IMessageToSend extends IMessage {
  senderId: string;
}

export const useChat = () => {
  const [socketId, setSocketId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = useAppSelector(selectAuthToken);
  const messages = useAppSelector(selectMessages);
  const error = useAppSelector(selectChatError);
  const isOnline = useAppSelector(selectIsOnline);
  const userId = useAppSelector(selectAuthId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token || socket) {
      return;
    }
    setSocket(() =>
      io("http://localhost:3000", {
        transports: ["websocket"],
        auth: { token },
      })
    );
  }, [token]);

  useEffect(() => {
    if (!socket) return;
    console.log("running");

    socket.on("connect", () => {
      setSocketId(socket.id);
      dispatch(connected());
    });

    socket.on("connect_error", (err) => {
      console.log("disconnected");
      setSocketId(null);
      dispatch(connectError(err.message));
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("receiveMessage", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = (msgBody: IMessage) => {
    if (!socket || !userId) return;
    const msg: IMessageToSend = { ...msgBody, senderId: userId };
    socket.emit("chatMessage", msg);
  };

  return {
    error,
    socketId,
    isOnline,
    messages,
    sendMessage,
  };
};
