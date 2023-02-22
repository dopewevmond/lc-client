import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { useRef, useState } from "react";
import { Toast } from "flowbite-react";
import { ChatInfo } from "../components/ChatInfo";
import { ChatSearchInput } from "../components/SearchBar";
import { ProfileSideBar } from "../components/ProfileSideBar";
import { NewChatSideBar } from "../components/NewChatSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { useAppSelector } from "../redux/store";
import { selectHasOpenedChat } from "../redux/chatSlice";
import { Outlet } from "react-router-dom";

export const HomePage = () => {
  const { logout } = useAuth();
  const [profileVisible, setProfileVisible] = useState(false);
  const [newChatVisible, setNewChatVisible] = useState(false);
  const hideProfileSidebar = () => setProfileVisible(false);
  const hideNewChatBar = () => setNewChatVisible(false);
  const hasOpenedChat = useAppSelector(selectHasOpenedChat);
  // const { error, socketId, isOnline, messages, sendMessage } = useChat();
  return (
    <div>
      <LeftSideBar
        isVisible={profileVisible}
        hideSidebar={hideProfileSidebar}
        title="Profile"
      >
        <ProfileSideBar />
      </LeftSideBar>
      <LeftSideBar
        isVisible={newChatVisible}
        hideSidebar={hideNewChatBar}
        title="New Chat"
      >
        <NewChatSideBar hideSideBar={hideNewChatBar} />
      </LeftSideBar>
      <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="w-[300px] lg:w-[400px] xl:w-[500px] h-screen border-r-2 border-r-gray-400 dark:border-r-gray-600">
          <div className="px-4 h-14 flex justify-between items-center">
            <div
              className="cursor-pointer w-12 h-12 rounded-full bg-primary-700"
              onClick={() => setProfileVisible(true)}
            ></div>
            <div
              className="cursor-pointer"
              onClick={() => setNewChatVisible(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
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

        {/* render outlet here */}
        <Outlet />
        {/* render outlet here */}
      </div>
    </div>
  );
};
