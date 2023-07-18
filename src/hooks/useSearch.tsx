import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useDebounce, useAutosizeTextArea} from "../hooks";


import { DEFAULT_VALUE, MAX_HEIGHT } from "../constants";

export const useSearch = (
  setOptions: (value: string) => void,
  handleSetTip: (value: string) => void,
  tip: string
) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>(DEFAULT_VALUE);
  const debouncedValue = useDebounce(value, 500);

  useAutosizeTextArea(textAreaRef.current, value, MAX_HEIGHT);

  const showHelp = useMemo(() => value === DEFAULT_VALUE, [value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const startsWithWriteA = newValue.startsWith(DEFAULT_VALUE);
    setValue(startsWithWriteA ? newValue : DEFAULT_VALUE);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "a" && event.ctrlKey) {
      event.preventDefault();
    }

    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      setValue(tip || DEFAULT_VALUE);
      handleSetTip('')
    }
  },[handleSetTip, tip]);

  const handleSelect = useCallback((event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const selectedText = event.currentTarget.value.substring(
      event.currentTarget.selectionStart,
      event.currentTarget.selectionEnd
    );

    if (selectedText.includes(DEFAULT_VALUE)) {
      event.currentTarget.setSelectionRange(
        value.length,
        value.length
      );
    }
  }, [value]);

  useEffect(() => {
    setOptions(debouncedValue);
  }, [debouncedValue, setOptions]);

  return {
    value,
    textAreaRef,
    showHelp,
    handleChange,
    handleKeyDown,
    handleSelect,
  };
};
