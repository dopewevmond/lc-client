// creates an animated sidebar with children rendered inside it

import React from "react";
import { BackIcon } from "../icons";

type SidebarProps = {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  hideSidebar: () => void;
};

export const LeftSideBar: React.FC<SidebarProps> = ({
  title,
  children,
  isVisible,
  hideSidebar,
}) => {
  return (
    <div
      className={`h-screen absolute z-10 slide-transition ${
        isVisible ? "translate-x-0" : "translate-x-[-500px]"
      }`}
    >
      <div className="w-[300px] lg:w-[400px] xl:w-[500px] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white h-screen border-r-2 border-r-gray-300 dark:border-r-gray-600">
        <div className="p-4 h-14"></div>
        <div className="h-16 flex items-center px-4">
          <div className="w-6 cursor-pointer" onClick={hideSidebar}>
            <BackIcon />
          </div>
          <h2 className="ml-3 font-medium text-lg">{title}</h2>
        </div>
        <div className="sidebar-fill-remaining-height bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};
