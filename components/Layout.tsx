import { FC } from "react";
import { Toaster } from "react-hot-toast";

const Layout: FC = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="container max-w-3xl mx-auto">
        <div className="mt-10">{children}</div>
      </div>
      <div className="flex items-center justify-center w-full py-10 mt-12 text-gray-600">
        <a className="group" href="twitter.com/aidenbuis">
          w/ <span className="text-orange-600">❤</span> by{" "}
          <span className="text-orange-600 group-hover:underline">
            @aidenbuis
          </span>
        </a>
      </div>
    </div>
  );
};

export default Layout;
