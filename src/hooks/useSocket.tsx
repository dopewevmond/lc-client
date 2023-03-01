import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectAuthToken } from "../redux/authSlice";
import { io } from "socket.io-client";
import {
  connected,
  connectError,
  initializeSocket,
  selectSocket,
  selectInitializedSocket,
  removeSocket,
} from "../redux/chatSlice";
import { BASE_URL } from "../utils/constants";

export const useSocket = () => {
  const socket = useAppSelector(selectSocket);
  const hasSocketBeenInitialized = useAppSelector(selectInitializedSocket);
  const token = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token || hasSocketBeenInitialized) {
      return;
    }
    console.log("connecting socket");
    dispatch(
      initializeSocket(
        io(BASE_URL, {
          transports: ["websocket"],
          auth: { token },
        })
      )
    );
    return () => {
      console.log("unmounting component. need to disconnect socket");
      if (socket) {
        socket.disconnect();
      }
      dispatch(removeSocket());
      console.log("finished disconnecting socket");
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;
    console.log("adding event listeners here");

    socket.on("connect", () => {
      dispatch(connected());
    });

    socket.on("connect_error", (err) => {
      console.log("disconnected");
      dispatch(connectError(err.message));
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("receiveMessage", (msg) => {
      console.log(msg);
    });

    console.log("finished adding event listeners");

    return () => {
      console.log("removing event listeners");
      socket.removeAllListeners();
      console.log("finished removing event listeners");
    };
  }, [socket]);
};
