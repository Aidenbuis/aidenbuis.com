import Lottie from "lottie-web";
import { useRef, useEffect } from "react";
import animationData from "@/data/git-init.json";

const LottieExample = () => {
  const containerEl = useRef(null);

  useEffect(() => {
    if (!containerEl.current) return;

    Lottie.loadAnimation({
      container: containerEl.current, // the dom element
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData, // the animation data
    });
  }, [containerEl]);

  return (
    <div>
      JOE
      <div ref={containerEl}></div>
    </div>
  );
};

export default LottieExample;
