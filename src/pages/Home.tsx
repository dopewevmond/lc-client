import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { useRef, useState } from "react";
import { Toast, Tooltip } from "flowbite-react";
import { ChatInfo } from "../components/ChatInfo";
import { ChatSearchInput } from "../components/SearchBar";
import { ProfileSideBar } from "../components/ProfileSideBar";
import { NewChatSideBar } from "../components/NewChatSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectHasOpenedChat } from "../redux/chatSlice";
import { Outlet } from "react-router-dom";
import { RightSideBar } from "../components/RightSideBar";
import { closeNewChat, closeProfile, openNewChat, openProfile, selectIsNewChatSideBarOpen, selectIsProfileSideBarOpen } from "../redux/sideBarSlice";
import { MessageIcon } from "../icons";
import { useSocket } from "../hooks/useSocket";

export const HomePage = () => {
  // const { logout } = useAuth();
  useSocket();
  const profileVisible = useAppSelector(selectIsProfileSideBarOpen);
  const newChatVisible = useAppSelector(selectIsNewChatSideBarOpen);
  const dispatch = useAppDispatch();
  const hasOpenedChat = useAppSelector(selectHasOpenedChat);
  const { isOnline } = useChat();
  return (
    <div>
      <LeftSideBar
        isVisible={profileVisible}
        hideSidebar={() => {
          dispatch(closeProfile())
        }}
        title="Profile"
      >
        <ProfileSideBar isOpened={profileVisible} />
      </LeftSideBar>
      <LeftSideBar
        isVisible={newChatVisible}
        hideSidebar={() => {
          dispatch(closeNewChat())
        }}
        title="New Chat"
      >
        <NewChatSideBar hideSideBar={() => {
          dispatch(closeNewChat())
        }} />
      </LeftSideBar>
      <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="w-[300px] lg:w-[400px] xl:w-[500px] h-screen border-r-2 border-r-gray-400 dark:border-r-gray-600">
          <div className="px-4 h-14 flex justify-between items-center">
            <div
              className="cursor-pointer w-12 h-12 rounded-full bg-primary-700"
              onClick={() => { dispatch(openProfile()) }}
            ></div>
            <div className="font-shantell-sans text-2xl -tracking-[0.1em] text-gray-600 dark:text-gray-300 pointer-events-none select-none">Chatty</div>
            <div className="flex items-center">
              <Tooltip content={isOnline ? 'online' : 'offline'} placement="left">
                <div className={`rounded-full h-4 w-4 p-1 mr-2 bg-green-600 ${isOnline ? 'bg-green-600': 'bg-red-600'}`}></div>
              </Tooltip>
              <button
                className="cursor-pointer"
                onClick={() => { dispatch(openNewChat()) }}
              >
                <MessageIcon />
              </button>
            </div>
          </div>
          <div className="h-16 flex items-center px-4">
            <ChatSearchInput
              placeholder="Search chats and messages"
              funcToDebounce={async (iv) => {
                console.log(iv);
              }}
            />
          </div>
          <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-50">
            <ChatInfo />
          </div>
        </div>

        {/* render content on the right panel into outlet */}
        <Outlet />
      </div>
    </div>
  );
};
