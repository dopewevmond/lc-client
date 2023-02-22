// write higher order component to wrap any component with dark background

import React from "react";

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
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
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
