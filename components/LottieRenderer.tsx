import Lottie from "lottie-web";
import { useRef, useEffect } from "react";
import LottieData from "@/data/export";

interface LottieRendererProps {
  data?: {};
  property?: keyof typeof LottieData;
  className?: string;
}

const LottieRenderer = ({
  data,
  property,
  className = "",
}: LottieRendererProps) => {
  const containerEl = useRef(null);

  useEffect(() => {
    if (!containerEl.current) return;

    const animationData = data ? data : property ? LottieData[property] : {};

    Lottie.loadAnimation({
      container: containerEl.current, // the dom element
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData, // the animation data
    });
  }, [containerEl, data, property]);

  return <div className={className} ref={containerEl} />;
};

export default LottieRenderer;
