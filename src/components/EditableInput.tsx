import React, { useRef, useState } from "react";
import { Spinner } from "flowbite-react";
import { CheckIcon, CancelIcon } from "../icons";

type Props = {
  initialFieldValue: string;
  setFieldValue: (value: string) => void;
  updateFieldWithAPI: (field: string, value: string) => Promise<void>;
  fieldName: string;
  label: string;
};

export const EditableInput = ({
  initialFieldValue,
  fieldName,
  label,
  setFieldValue,
  updateFieldWithAPI,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocus] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleUsernameBlur = () => {
    setInputFocus(false);
    if (inputRef && inputRef.current && !isEditing) {
      inputRef.current.value = initialFieldValue;
    }
  };
  const handleUsernameFocus = () => {
    setInputFocus(true);
  };
  return (
    <>
      <label
        htmlFor={fieldName}
        className=" inline-block mb-2 text-sm font-medium"
      >
        {label}
      </label>
      <div className="relative h-full overflow-hidden">
        <input
          ref={inputRef}
          id={fieldName}
          className="block rounded-lg p-2.5 w-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 focus:ring-0 border border-gray-100 dark:border-gray-600 focus:border-gray-100 dark:focus:border-gray-600 text-gray-900 dark:text-white sm:text-sm"
          type="text"
          onFocus={handleUsernameFocus}
          onBlur={handleUsernameBlur}
          defaultValue={initialFieldValue}
          autoComplete="off"
          disabled={isEditing}
        />
        <div
          className={`absolute right-0 top-0 h-full flex items-center px-2 ${
            isEditing ? "translate-x-0" : "translate-x-20"
          }`}
        >
          <Spinner
            size="sm"
            color="gray"
            aria-label="loadingProfileDetails spinner"
          />
        </div>
        <div
          className={`absolute right-0 top-0 h-full flex rounded-none rounded-r-lg transition-all ${
            inputFocused ? "translate-y-0" : "translate-y-[-100px]"
          }`}
        >
          <span
            className="flex items-center px-2 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer"
            onMouseDown={() => {
              if (inputRef && inputRef.current) {
                inputRef.current.value = initialFieldValue;
              }
            }}
          >
            <CancelIcon />
          </span>
          <span
            className="flex items-center px-2 rounded-none rounded-r-lg hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer"
            onMouseDown={async () => {
              setInputFocus(false);
              setIsEditing(true);
              try {
                if (
                  inputRef &&
                  inputRef.current &&
                  inputRef.current.value !== initialFieldValue
                ) {
                  await updateFieldWithAPI(fieldName, inputRef.current.value);
                  setFieldValue(inputRef.current.value);
                }
              } catch (err) {
                // call toast here
              } finally {
                setIsEditing(false);
              }
            }}
          >
            <CheckIcon />
          </span>
        </div>
      </div>
    </>
  );
};
