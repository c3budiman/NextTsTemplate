import { useState, useEffect } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean | undefined;
}
/**
 * `useWindowSize` hook
 *
 *  this is a custom hook to get the window size, and also a mobile state
 *
 */
export default function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
    isMobile: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 501,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
