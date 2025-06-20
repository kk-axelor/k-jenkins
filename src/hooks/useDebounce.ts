import { useEffect, useState } from "react";

export const useDebounce = (text: string, time: number) => {
  const [debouseText, setDebouseText] = useState<string>("");

  useEffect(() => {
    console.log(debouseText);
    const timer = setTimeout(() => {
      setDebouseText(text);
    }, time);
    return () => clearTimeout(timer);
  }, [text]);

  return debouseText;
};
