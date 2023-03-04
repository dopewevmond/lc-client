import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlankFace } from "../icons";
import { selectAuthId } from "../redux/authSlice";
import { selectChats, selectRecentChats } from "../redux/chatSlice";
import { openNewChat } from "../redux/sideBarSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const ChatInfo = () => {
  const chats = useAppSelector(selectChats);
  const userSocketId = useAppSelector(selectAuthId);
  const recentChats = useAppSelector(selectRecentChats);
  const dispatch = useAppDispatch();
  const [jsxContent, setJsxContent] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    const keys = Array.from(recentChats.keys());
    const totalContent: JSX.Element[] = [];
    for (let i = recentChats.size - 1; i >= 0; i--) {
      const content = (
        <Link
          to={`/chat/${keys[i]}`}
          key={keys[i]}
          className="block p-3 border-b border-b-gray-200 dark:border-b-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary-700"></div>
            <div className="flex-1 overflow-hidden pl-3 flex flex-col">
              <span className="font-medium">
                {chats[keys[i]].details.displayName}
              </span>
              <span className="text-sm truncate">
                <span className="text-gray-600 dark:text-gray-400">
                  {userSocketId === recentChats.get(keys[i])?.senderId
                    ? "You"
                    : chats[keys[i]].details.displayName}
                  :{" "}
                </span>
                {recentChats.get(keys[i])?.message}
              </span>
            </div>
          </div>
        </Link>
      );
      totalContent.push(content);
    }
    setJsxContent(totalContent);
  }, [recentChats]);

  return (
    <div className="overflow-y-scroll sidebar-fill-remaining-height">
      {jsxContent && jsxContent.map((jsx) => jsx)}

      {chats && Object.keys(chats).length === 0 && (
        <div className="p-4 text-md text-center text-gray-300 dark:text-gray-600">
          <div className="flex justify-center my-4">
            <BlankFace />
          </div>
          <div className="text-gray-400">
            <div>You have no chats to display.</div>
            <div>
              Click{" "}
              <span
                className="underline cursor-pointer text-gray-500 dark:text-gray-200"
                onClick={() => dispatch(openNewChat())}
              >
                here
              </span>{" "}
              to get started.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
