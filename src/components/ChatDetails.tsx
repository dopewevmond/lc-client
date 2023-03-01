import React from "react";
import { CancelIcon } from "../icons";
import { selectOpenedChat } from "../redux/chatSlice";
import {
  closeChatDetails,
  selectIsChatDetailsOpen,
} from "../redux/sideBarSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { RightSideBar } from "./RightSideBar";

export const ChatDetails = () => {
  const chatDetailsOpen = useAppSelector(selectIsChatDetailsOpen);
  const openedChatDetails = useAppSelector(selectOpenedChat);
  const dispatch = useAppDispatch();
  return (
    <RightSideBar isVisible={chatDetailsOpen}>
      <div className="h-16 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-50 flex items-center">
        <button
          className="ml-4 w-8"
          onClick={() => {
            dispatch(closeChatDetails());
          }}
        >
          <CancelIcon />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="mt-8 w-48 h-48 rounded-full bg-primary-600"></div>
      </div>
      <div className="text-center mt-4">
        <h3 className="text-2xl">{openedChatDetails?.displayName}</h3>
        <p className="text-md text-gray-400">@{openedChatDetails?.username}</p>
      </div>
      <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-50 py-2 mt-4">
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4">
          <div className="text-gray-400">Bio</div>
          <div>{openedChatDetails?.bio}</div>
        </div>
      </div>
    </RightSideBar>
  );
};
