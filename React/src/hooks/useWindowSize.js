import { useState, useEffect } from "react";

// Custom Hook handles responsive design by updating the width property whenever the window is resized
function getBreakPoint(windowWidth) {
  if (windowWidth) {
    if (windowWidth < 992) return "sm";
    else return "lg";
  } else {
    return undefined;
  }
}

function useWindowSize() {
  const isWindowClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? getBreakPoint(window.innerWidth) : undefined
  );

  useEffect(() => {
    function setSize() {
      setWindowSize(getBreakPoint(window.innerWidth));
    }

    if (isWindowClient) {
      window.addEventListener("resize", setSize);
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient]);

  return windowSize;
}

export default useWindowSize;
