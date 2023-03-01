import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BackIcon, PaperPlane } from "../icons";
import { openChat, selectOpenedChat } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IUser } from "../types";
import { axiosInstance } from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { selectAuthToken } from "../redux/authSlice";
import {
  openChatDetails,
  selectIsChatDetailsOpen,
} from "../redux/sideBarSlice";
import { ChatDetails } from "./ChatDetails";
import { useChat } from "../hooks/useChat";

export const CurrentChat = (props: any) => {
  const currentChat = useAppSelector(selectOpenedChat);
  const chatAlreadyOpened = useAppSelector(selectOpenedChat);
  const chatDetailsVisible = useAppSelector(selectIsChatDetailsOpen);
  const token = useAppSelector(selectAuthToken);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendMessage } = useChat();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!chatAlreadyOpened) {
      const fetchChatInfo = async () => {
        try {
          setLoading(true);
          const { data } = await axiosInstance.get<IUser>(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(openChat(data));
        } catch (err) {
          setError("An error occured while fetching the user details");
        } finally {
          setLoading(false);
        }
      };
      fetchChatInfo();
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <span>
        {error}. Click <Link to="/"> here </Link> to go back
      </span>
    );

  if (currentChat == null)
    return (
      <span>
        chat not found. click <Link to="/"> here </Link> to go back
      </span>
    );

  const { username, displayName, _id } = currentChat;
  return (
    <>
      <ChatDetails />
      <div className="flex-1 h-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-50">
        <div className="h-16 p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
          <div className="flex">
            <Link to="/" className="w-6 flex justify-center items-center">
              <BackIcon />
            </Link>
            <div className="ml-3 w-12 h-12 rounded-full bg-primary-700"></div>
            <div className="ml-2 flex flex-col justify-center">
              <span className="text-sm">{displayName}</span>
              <span className="text-xs">@{username}</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(openChatDetails());
            }}
            className="cursor-pointer"
          >
            View profile
          </div>
        </div>
        <div className="p-5 h-[calc(100%_-_7rem)] overflow-y-auto bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-50 text-sm">
          <div className="chat-bubble-own">
            <span>hey</span>
          </div>
          <div className="chat-bubble-other">
            <span>what's up</span>
          </div>
          <div className="chat-bubble-own">
            <span>nothing interesting</span>
          </div>
          <div className="chat-bubble-own">
            <span>im just checking on you</span>
          </div>
          <div className="chat-bubble-other">
            <span>that's sus man, foh</span>
          </div>
          <div className="chat-bubble-own">
            <span>whatever man</span>
          </div>
        </div>
        <form
          className="h-12 w-full flex"
          onSubmit={(e) => {
            e.preventDefault();
            if (message.trim().length > 0) {
              sendMessage({ message, recipientId: _id });
              setMessage('');
            }
          }}
        >
          <input
            type="text"
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-full w-full flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-none rounded-r-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600"
          />
          <button
            className="w-12 flex justify-center items-center disabled:text-gray-100 dark:disabled:text-gray-600"
            disabled={message.trim().length < 1}
          >
            <PaperPlane />
          </button>
        </form>
      </div>
    </>
  );
};
