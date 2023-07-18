import {useCallback, useEffect, useMemo, useState} from "react";

interface ListOption {
  text: string;
  icon: string;
}

export const useInlineText = (options: ListOption[]) => {
  const [currentOption, setCurrentOption] = useState<ListOption[]>([]);
  const [tip, setTip] = useState<string>('');

  const handleSetOptions = useCallback((value: string) => {
    const modifiedValue = value.replace(/^Write a\s/, '');
    const newOptions = options.filter(item => item.text.includes(modifiedValue));
    setCurrentOption(modifiedValue ? newOptions : options);
  }, [options]);

  const handleSetTip = useCallback((value: string) => {
    setTip(value)
  }, []);

  const showTip = useMemo(() => currentOption.length === 1, [currentOption]);

  useEffect(() => {
    setCurrentOption(options);
  }, [options]);

  return { currentOption, handleSetOptions, handleSetTip, tip, showTip }
}
