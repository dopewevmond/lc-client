import React from "react";
import { BackIcon } from "../icons";

type SideBarProps = {
  children: React.ReactNode;
  isVisible: boolean;
};

export const RightSideBar: React.FC<SideBarProps> = ({
  children,
  isVisible,
}) => {
  return (
    <div
      className={`${
        isVisible ? "translate-x-0" : "translate-x-[1000px]"
      } slide-transition h-screen overflow-y-auto absolute top-0 right-0 z-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-[calc(100vw_-_300px)] lg:w-[calc(100vw_-_400px)] xl:w-[calc(100vw_-_500px)]`}
    >
      {children}
    </div>
  );
};
