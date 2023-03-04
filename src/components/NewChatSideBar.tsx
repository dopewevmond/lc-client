import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchForUser } from "../hooks/useSearchForUser";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { BackIcon, SearchIcon } from "../icons";
import { openChat } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Spinner } from "flowbite-react";
import { selectIsNewChatSideBarOpen } from "../redux/sideBarSlice";

type Props = {
  hideSideBar: () => void;
};

export const NewChatSideBar = ({ hideSideBar }: Props) => {
  const dispatch = useAppDispatch();
  const chatSidebarOpen = useAppSelector(selectIsNewChatSideBarOpen);
  const { searchResults, makeAPICall, resetResults, loading } =
    useSearchForUser();
  const callAPIFunc = useCallback(makeAPICall, []); // without this a new function is created on every render and the debounce functionality wont work
  const {
    isFocused,
    handleSearchIconClick,
    inputValue,
    inputRef,
    handleInputChange,
    handleInputOnBlur,
    handleInputOnFocus,
    setInputValue,
  } = useDebouncedSearch(callAPIFunc, 600);

  useEffect(() => {
    if (!chatSidebarOpen) {
      return;
    }
    if (!inputRef || !inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, [chatSidebarOpen]);

  return (
    <>
      <div className="p-4">
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
            placeholder="Search by username or display name"
            className="flex-1 text-gray-900 block p-2.5 dark:placeholder-gray-400 dark:text-white text-xs border-0 rounded-r-lg bg-gray-50 dark:bg-gray-700 focus:ring-0"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Spinner size="sm" color="gray" aria-label="loading spinner" />
        </div>
      ) : (
        <div className="mx-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          {searchResults != null && (
            <>
              {searchResults.length === 0 ? (
                <p className="p-4">No users found</p>
              ) : (
                <div className="px-4">
                  {searchResults.map((user) => (
                    <div
                      key={user._id}
                      className="py-4 border-b border-b-gray-200 dark:border-b-gray-700"
                    >
                      <Link
                        to={`/chat/${user._id}`}
                        onClick={() => {
                          dispatch(openChat(user));
                          hideSideBar();
                          resetResults();
                          setInputValue("");
                        }}
                      >
                        <div className="flex">
                          <div className="w-12 h-12 bg-primary-600 rounded-full mr-3"></div>
                          <div className="flex flex-col">
                            <span>{user.displayName}</span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {user.username}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
