import { useChat } from "../hooks/useChat";
import { useContext, useState } from "react";
import { Tooltip } from "flowbite-react";
import { ChatInfo } from "../components/ChatInfo";
import { ProfileSideBar } from "../components/ProfileSideBar";
import { NewChatSideBar } from "../components/NewChatSideBar";
import { LeftSideBar } from "../components/LeftSideBar";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Outlet, useNavigate } from "react-router-dom";
import {
  closeNewChat,
  closeProfile,
  openNewChat,
  openProfile,
  selectIsNewChatSideBarOpen,
  selectIsProfileSideBarOpen,
} from "../redux/sideBarSlice";
import {
  CancelIcon,
  LogOutIcon,
  MessageIcon,
  MoonIcon,
  SunIcon,
  BackIcon,
  SearchIcon,
} from "../icons";
import { useSocket } from "../hooks/useSocket";
import { ThemeContext } from "../context/ThemeContext";
import LogoutModal from "../components/LogoutModal";
import { selectChats } from "../redux/chatSlice";
import { IUser } from "../types";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";

export const HomePage = () => {
  useSocket();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOnline } = useChat();
  const { theme, setTheme } = useContext(ThemeContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchingChats, setSearchingChats] = useState(false);
  const [searchChatsResults, setSearchChatsResults] = useState<IUser[] | null>(
    null
  );
  const profileVisible = useAppSelector(selectIsProfileSideBarOpen);
  const newChatVisible = useAppSelector(selectIsNewChatSideBarOpen);
  const chats = useAppSelector(selectChats);

  const results: IUser[] = [];
  const searchFunction = async (searchVal: string) => {
    if (Boolean(searchVal.trim())) {
      chats && Object.keys(chats).map((otherUserId) => {
        if (
          chats[otherUserId].details.displayName.includes(searchVal) ||
          chats[otherUserId].details.username.includes(searchVal)
        ) {
          results.push(chats[otherUserId].details);
        }
      });
    }
    setSearchChatsResults(results);
    setSearchingChats(true);
  };

  const {
    inputValue,
    inputRef,
    handleInputChange,
    handleInputOnFocus,
    handleInputOnBlur,
    isFocused,
    handleSearchIconClick,
    setInputValue,
  } = useDebouncedSearch(searchFunction, 600);
  return (
    <div>
      {showLogoutModal && (
        <LogoutModal close={() => setShowLogoutModal(false)} />
      )}
      <LeftSideBar
        isVisible={profileVisible}
        hideSidebar={() => {
          dispatch(closeProfile());
        }}
        title="Profile"
      >
        <ProfileSideBar />
      </LeftSideBar>
      <LeftSideBar
        isVisible={newChatVisible}
        hideSidebar={() => {
          dispatch(closeNewChat());
        }}
        title="Start new chat"
      >
        <NewChatSideBar
          hideSideBar={() => {
            dispatch(closeNewChat());
          }}
        />
      </LeftSideBar>

      <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="w-[300px] lg:w-[400px] xl:w-[500px] h-screen border-r-2 border-r-gray-400 dark:border-r-gray-600">
          <div className="px-4 h-14 flex justify-between items-center">
            <div
              className="cursor-pointer w-12 h-12 rounded-full bg-primary-700"
              onClick={() => {
                dispatch(openProfile());
              }}
            ></div>
            <div className="font-shantell-sans text-2xl -tracking-[0.1em] text-gray-600 dark:text-gray-300 pointer-events-none select-none">
              Chatty
            </div>
            <div className="flex items-center">
              <Tooltip
                content={isOnline ? "online" : "offline"}
                placement="left"
              >
                <div
                  className={`rounded-full h-4 w-4 p-1 mr-2 bg-green-600 ${
                    isOnline ? "bg-green-600" : "bg-red-600"
                  }`}
                ></div>
              </Tooltip>
              <button
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-gray-200 dark:focus-visible:outline-gray-700"
                onClick={() => {
                  if (theme === "light") {
                    setTheme("dark");
                  } else {
                    setTheme("light");
                  }
                }}
              >
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </button>
              <button
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-gray-200 dark:focus-visible:outline-gray-700"
                onClick={() => {
                  dispatch(openNewChat());
                }}
              >
                <MessageIcon />
              </button>
              <button
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-gray-200 dark:focus-visible:outline-gray-700"
                onClick={() => setShowLogoutModal(true)}
              >
                <LogOutIcon />
              </button>
            </div>
          </div>
          <div className="h-16 flex items-center px-4">
            <div className="w-full flex items-center text-xs bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg">
              <span className="w-8 p-2 cursor-pointer">
                {isFocused ? (
                  <BackIcon />
                ) : (
                  <div onClick={handleSearchIconClick}>
                    <SearchIcon />
                  </div>
                )}
              </span>
              <input
                value={inputValue}
                ref={inputRef}
                type="text"
                onChange={handleInputChange}
                onFocus={handleInputOnFocus}
                onBlur={handleInputOnBlur}
                placeholder="Search your chats"
                className="flex-1 text-gray-900 block p-2.5 dark:placeholder-gray-400 dark:text-white text-xs border-0 rounded-r-lg bg-gray-50 dark:bg-gray-700 focus:ring-0 focus:placeholder-white dark:focus:placeholder-gray-700"
              />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-50">
            {searchingChats ? (
              <div className="overflow-y-scroll sidebar-fill-remaining-height py-3 px-8">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-medium">Search Results</h4>
                  <button
                    onClick={() => {
                      setSearchingChats(false);
                      setInputValue("");
                    }}
                  >
                    <CancelIcon />
                  </button>
                </div>
                <div>
                  {searchChatsResults && searchChatsResults.length !== 0 ? (
                    searchChatsResults.map(({ _id, displayName, username }) => (
                      <div
                        onClick={() => {
                          navigate(`/chat/${_id}`);
                          setSearchingChats(false);
                          setInputValue("");
                        }}
                        className="p-4 border-b border-b-gray-300 dark:border-b-gray-600 cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <div className="flex">
                          <div className="w-12 h-12 bg-primary-600 rounded-full mr-3"></div>
                          <div className="flex flex-col">
                            <span>{displayName}</span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {username}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 select-none pointer-events-none rounded-lg bg-gray-50 dark:bg-gray-600">
                      No chats were found
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <ChatInfo />
            )}
          </div>
        </div>

        {/* render content on the right panel into outlet */}
        <Outlet />
      </div>
    </div>
  );
};
