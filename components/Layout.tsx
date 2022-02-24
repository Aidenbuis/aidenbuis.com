import { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <div className="container max-w-3xl mx-auto">
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
