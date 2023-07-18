import { useEffect } from "react";

export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  maxHeight: number
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "auto";
      const scrollHeight = textAreaRef.scrollHeight;

      if (scrollHeight > maxHeight) {
        textAreaRef.style.height = maxHeight + "px";
        textAreaRef.style.overflowY = "auto";
      } else {
        textAreaRef.style.height = scrollHeight + "px";
        textAreaRef.style.overflowY = "hidden";
      }
    }
  }, [textAreaRef, value, maxHeight]);
};
