import { useState, useEffect } from "react";

const useIsMobileViewport = () => {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isMobileViewport;
};

export default useIsMobileViewport;
