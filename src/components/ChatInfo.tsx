import React from "react";

export const ChatInfo = () => {
  const items = [];
  for (let i = 0; i < 35; i++) {
    items.push(
      <div className="p-3 border-b border-b-gray-200 dark:border-b-gray-600">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary-700"></div>
          <div className="flex-1 overflow-hidden pl-3 flex flex-col">
            <span>John Doe</span>
            <span className="text-sm truncate">
              Message content is overflowing so use ellipses. Message content is
              overflowing so use ellipses
            </span>
          </div>
          <div className="w-8 h-12 flex flex-col text-sm justify-between items-end">
            <span
              className={`${
                i % 2 == 0 ? "text-primary-700 dark:text-primary-300" : ""
              }`}
            >
              Friday
            </span>
            {i % 2 == 0 ? (
              <span className=" bg-primary-700 dark:bg-primary-300 text-white dark:text-gray-700 h-6 w-6 rounded-full flex justify-center items-center">
                5
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-y-scroll sidebar-fill-remaining-height">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>{item}</React.Fragment>
      ))}
    </div>
  );
};
