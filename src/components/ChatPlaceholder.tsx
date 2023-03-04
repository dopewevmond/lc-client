import React from "react";
import { ComputerIcon } from "../icons";

export const OpenChatPlaceholder = () => {
  return (
    <>
      <div className="flex-1 h-full flex items-center justify-center bg-white dark:bg-gray-700 text-gray-400">
        <div>
          <div className="w-28 text-gray-300 dark:text-gray-600 mx-auto">
            <ComputerIcon />
          </div>
          <div>
            <p className="text-md text-center">
              You have no open chats <br />
              Click on a chat in the left panel to get started.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
