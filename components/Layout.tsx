import { FC } from "react";
import { Toaster } from "react-hot-toast";

const Layout: FC = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <Toaster
        toastOptions={{
          style: {
            background: "#f3f4f6",
            margin: "2rem",
          },
        }}
        position="bottom-left"
      />
      <div
        id="page-container"
        style={{
          transition: "left 150ms",
          left: "0px",
        }}
        className="container relative max-w-3xl mx-auto transition duration-150 ease-in"
      >
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
