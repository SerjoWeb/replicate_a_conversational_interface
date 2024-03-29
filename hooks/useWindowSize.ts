"use client";

import React from "react";

interface IWindowSize {
  height: number | undefined;
  width: number | undefined;
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize); 
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
