import { FC } from "react";

type BadgeProps = {
  color: "blue" | "green" | "yellow";
};

const Badge: FC<BadgeProps> = ({ children, color }) => {
  const getClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-300 text-blue-900";
      case "green":
        return "bg-green-300 text-green-900";
      case "yellow":
        return "bg-yellow-300 text-yellow-900";
      default:
        return "";
    }
  };

  const colorClasses = getClasses();

  return <span className={`px-2 rounded-md ${colorClasses}`}>{children}</span>;
};

export default Badge;
