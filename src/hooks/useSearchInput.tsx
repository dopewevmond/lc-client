import { useState, useRef, useCallback } from "react";
import { debounce } from "../utils/debounce";

export const useDebouncedSearch = (
  funcToDebounce: (inputValue: string) => Promise<void>,
  debounceTime = 1000
) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputOnFocus = () => {
    setFocus(true);
  };
  const handleInputOnBlur = () => {
    setFocus(false);
  };
  const handleSearchIconClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      funcToDebounce(value);
    }, debounceTime),
    [funcToDebounce, debounceTime]
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedOnChange(newValue);
  };
  return {
    inputValue,
    setInputValue,
    isFocused,
    setFocus,
    inputRef,
    handleInputOnFocus,
    handleInputOnBlur,
    handleSearchIconClick,
    handleInputChange,
  };
};
