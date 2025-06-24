import { useEffect } from "react";

let cache: Map<string, any> = new Map();

export function useProductCache(ms: number = 300) {
  useEffect(() => {
    setInterval(() => {
      cache.clear();
    }, ms);
  });
  const get = (query: string) => cache.get(query);
  const set = (query: string, data: any) => cache.set(query, data);
  return { get, set };
}
