import { useEffect } from "react";

export default function useDebounce(callback, deps, delay) {
  useEffect(() => {
    const handler = setTimeout(callback, delay);
    return () => clearTimeout(handler);
  }, [...deps, delay]);
}
