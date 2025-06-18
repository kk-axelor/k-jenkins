import { useEffect, useRef, useState } from "react";

export function useOnScroll() {
  const scrollRef = useRef(false);
  const [fetchMore, setFetchMore] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 10
      ) {
        if (!scrollRef.current) {
          scrollRef.current = true;
          setFetchMore(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollRef, fetchMore, setFetchMore };
}
