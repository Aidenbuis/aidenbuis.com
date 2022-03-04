import { useEffect, useState, useRef, FC } from "react";
import { useWindowSize } from "react-use";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";

import { placeContentToTheRight } from "@/utils/articleUtils";

const directory = [
  {
    name: ".git",
    open: true,
    type: "folder",
    content: [
      { name: "hooks", type: "folder", content: [] },
      { name: "info", type: "folder", content: [] },
      { name: "objects", type: "folder", content: [] },
      { name: "refs", type: "folder", content: [] },
      { name: "config", type: "file", content: null },
      { name: "description", type: "file", content: null },
      { name: "HEAD", type: "file", content: null },
      { name: "index", type: "file", content: null },
    ],
  },
];

const InnerWorkingsDirectory = () => {
  const [initialized, setInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [directoryStyles, setDirectoryStyles] = useState({ width: 0, left: 0 });

  const containerEl = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  // Initialize Event Listeners
  useEffect(() => {
    window.addEventListener("command", handleCommandEvent);

    return () => {
      window.removeEventListener("command", handleCommandEvent);
    };
  }, []);

  // Initialize styles
  useEffect(() => {
    window.setTimeout(() => {
      if (!containerEl.current) return;
      const containerWidth = containerEl.current.offsetWidth;
      // Get marginLeft containerEl
      const containerMarginLeft = parseInt(
        getComputedStyle(containerEl.current).marginLeft
      );

      const windowWidth = windowSize.width;
      const whitespace = windowWidth - containerWidth;
      const marginRight = whitespace / 4;
      const articleContainerLeft = whitespace / 2 - marginRight;

      const containerOffsetLeft = containerEl.current.offsetLeft;
      console.log(
        "Directory width",
        articleContainerLeft + containerMarginLeft
      );
      setDirectoryStyles({
        width: articleContainerLeft + containerMarginLeft,
        left: containerWidth + containerOffsetLeft,
      });
    }, 400); // 150 ms timeout
  }, [initialized, windowSize.width]);

  const handleCommandEvent = (e: CustomEventInit<string>) => {
    const command = e.detail;
    if (!command) {
      return;
    } else if (command === "git init") {
      setInitialized(true);
      placeContentToTheRight("init");
    } else if (command === "reset git init") {
      setInitialized(false);
      placeContentToTheRight("reset");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full pointer-events-none">
      <div
        ref={containerEl}
        className="container h-screen max-w-3xl mx-auto mt-10"
      >
        {initialized && (
          <motion.div
            initial={{ opacity: 0, left: -40 }}
            animate={{ opacity: 1, left: 0 }}
            exit={{ opacity: 0, left: -40 }}
            style={{
              width: directoryStyles.width,
              left: "0px",
            }}
            className="fixed top-0 left-0 flex flex-row items-start justify-end h-screen mt-16 md:8 md:10 lg:px-16"
          >
            <div className="w-full overflow-hidden bg-gray-100 border border-gray-300 rounded-md shadow-lg pointer-events-auto">
              <div
                className={`${
                  isOpen ? "border-b" : ""
                } flex items-center justify-between px-5 py-2 transition-colors duration-150 ease-in bg-gray-200 cursor-pointer select-none hover:bg-gray-300`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="font-bold">Directory</span>
                {isOpen ? (
                  <ChevronDownIcon className="inline-block w-6 h-6" />
                ) : (
                  <ChevronUpIcon className="inline-block w-6 h-6" />
                )}
              </div>
              {isOpen && <FoldersAndFiles items={directory} />}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface FileProps {
  name: string;
  type: "file";
  content: null;
}
interface FolderProps {
  name: string;
  open: boolean;
  type: "folder";
  content: FileProps[] | FolderProps[];
}

interface FoldersAndFilesProps {
  items: FolderProps[] | FileProps[];
}

const FoldersAndFiles = ({ items }: FoldersAndFilesProps) => (
  <ul className="px-3 py-2 list-none opacity-100">
    {items.map((item) => {
      if (item.type === "file") {
        return (
          <li key={item.name} className="pl-4 mt-1">
            {item.name}
          </li>
        );
      } else if (item.type === "folder" && item.content > 0) {
        return (
          <FolderItem item={item}>
            <FoldersAndFiles items={item.content} />
          </FolderItem>
        );
      } else if (item.type === "folder" && item.content === 0) {
        <li className="pl-4 mt-1 italic text-gray-500">No files</li>;
      }
    })}
  </ul>
);

interface FolderItemProps {
  item: {
    name: string;
    content: any[];
    type: string;
    open?: boolean;
  };
}

const FolderItem: FC<FolderItemProps> = ({ item, children }) => {
  const [isOpen, setIsOpen] = useState(item.open ? item.open : false);
  return (
    <>
      <li
        className="mt-1 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDownIcon className="inline-block w-4 h-4" />
        ) : (
          <ChevronRightIcon className="inline-block w-4 h-4" />
        )}
        {item.name}
      </li>
      {children}
    </>
  );
};

export default InnerWorkingsDirectory;
