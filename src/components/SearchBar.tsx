import React, { useState, useRef, useCallback } from "react";
import { debounce } from "../utils/debounce";
import { useDebouncedSearch } from "../hooks/useSearchInput";

type Props = {
  funcToDebounce: (inputValue: string) => Promise<void>;
  placeholder: string;
};

export const ChatSearchInput: React.FC<Props> = ({
  funcToDebounce,
  placeholder,
}) => {
  const {
    inputValue,
    isFocused,
    inputRef,
    handleInputOnFocus,
    handleInputOnBlur,
    handleSearchIconClick,
    handleInputChange,
  } = useDebouncedSearch(funcToDebounce);

  return (
    <div className="w-full flex items-center text-xs bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg">
      <span className="w-8 p-2 cursor-pointer">
        {isFocused ? (
          <svg
            key="backIcon"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            onClick={() => {
              console.log("clicked me");
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        ) : (
          <svg
            key="searchIcon"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            onClick={handleSearchIconClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        )}
      </span>
      <input
        value={inputValue}
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        onFocus={handleInputOnFocus}
        onBlur={handleInputOnBlur}
        placeholder={placeholder}
        className="flex-1 text-gray-900 block p-2.5 dark:placeholder-gray-400 dark:text-white text-xs border-0 rounded-r-lg bg-gray-50 dark:bg-gray-700 focus:ring-0 focus:placeholder-white dark:focus:placeholder-gray-700"
      />
    </div>
  );
};
