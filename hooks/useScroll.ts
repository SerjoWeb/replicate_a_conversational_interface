import React from "react";

export default function useScroll() {
  const [scrollY, setScrollY] = React.useState<number>(0);
  
  const onScroll = React.useCallback(() => {
    if (typeof window !== "undefined") {
      setScrollY(window.scrollY);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return scrollY;
};
