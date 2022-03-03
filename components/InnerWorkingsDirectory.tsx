import { useEffect, useState, useRef } from "react";
import { useWindowSize } from "react-use";
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/outline";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { Item } from "framer-motion/types/components/Reorder/Item";

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
    if (!containerEl.current) return;

    const containerWidth = containerEl.current.offsetWidth;
    const containerOffsetLeft = containerEl.current.offsetLeft;

    setDirectoryStyles({
      width: containerOffsetLeft,
      left: containerWidth + containerOffsetLeft,
    });
  }, [initialized, windowSize.width]);

  const handleCommandEvent = (e: CustomEventInit<string>) => {
    const command = e.detail;
    if (!command) {
      return;
    } else if (command === "git init") {
      setInitialized(true);
    } else if (command === "reset git init") {
      setInitialized(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full pointer-events-none">
      <div
        ref={containerEl}
        className="container flex items-center h-screen max-w-3xl mx-auto mt-10"
      >
        <Directory
          isOpen={isOpen}
          initialized={initialized}
          directoryStyles={directoryStyles}
        />
        <ToggleDirectoryButton
          directoryStyles={directoryStyles}
          initialized={initialized}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

interface DirectoryProps {
  isOpen: boolean;
  initialized: boolean;
  directoryStyles: {
    left: number;
    width: number;
  };
}

const Directory = ({
  isOpen,
  initialized,
  directoryStyles,
}: DirectoryProps) => {
  const directory = [
    { name: "hooks", content: [] },
    { name: "info", content: [] },
    { name: "objects", content: [] },
    { name: "refs", content: [] },
    "config",
    "description",
    "HEAD",
    "index",
  ];

  return (
    <AnimatePresence>
      {isOpen && initialized && (
        <motion.div
          initial={{ opacity: 0, left: -25 }}
          animate={{ opacity: 1, left: 0 }}
          exit={{ opacity: 0, left: -25 }}
          style={{
            width: directoryStyles.width,
            left: "0px",
          }}
          className="fixed top-0 left-0 flex items-center justify-center h-screen px-10"
        >
          <div className="w-full bg-gray-100 border border-gray-300 rounded-md shadow-lg pointer-events-auto">
            <div className="px-5 py-2 bg-gray-200 border-b">
              <span className="font-bold">Directory</span>
            </div>
            <ul className="px-3 py-2 list-none">
              {directory.map((item) => {
                const isFile = typeof item === "string";
                if (isFile) {
                  return <li className="pl-4 mt-1">{item}</li>;
                } else {
                  return <FolderItem item={item} />;
                }
                return <span key="item">Joe</span>;
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface FolderItemProps {
  item: {
    name: string;
    content: never[];
  };
}

const FolderItem = ({ item }: FolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <li className="mt-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <ChevronDownIcon className="inline-block w-4 h-4" />
        ) : (
          <ChevronRightIcon className="inline-block w-4 h-4" />
        )}
        {item.name}
      </li>
      {isOpen && item.content.length > 0 ? (
        <ul className="pl-4">
          {item.content.map((subItem: string) => (
            <li key={subItem}>{subItem}</li>
          ))}
        </ul>
      ) : isOpen && item.content.length === 0 ? (
        <li className="pl-5">
          <span className="text-sm italic text-gray-500">No items</span>
        </li>
      ) : null}
    </>
  );
};

interface ToggleDirectoryButtonProps {
  directoryStyles: {
    left: number;
    width: number;
  };
  initialized: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ToggleDirectoryButton = ({
  directoryStyles,
  initialized,
  isOpen,
  setIsOpen,
}: ToggleDirectoryButtonProps) => {
  return (
    <AnimatePresence>
      {initialized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed top-0 right-0 flex items-center justify-center h-screen"
          style={{
            left: `${directoryStyles.left}px`,
            width: `${directoryStyles.width}px`,
          }}
        >
          <div
            className="flex items-center justify-center w-16 h-16 p-1 ml-4 text-gray-800 transition duration-150 ease-in bg-gray-100 border border-gray-300 rounded-full shadow-md cursor-pointer pointer-events-auto select-none hover:text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FolderOpenIcon className="w-6 h-6" />
            ) : (
              <FolderIcon className="w-6 h-6" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InnerWorkingsDirectory;
