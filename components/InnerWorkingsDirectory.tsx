import { useEffect, useMemo, useState, useRef, FC } from "react";
import { useWindowSize } from "react-use";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";

import innerWorkingsDirectoryData, {
  FolderProps,
  FilePropsOrFolderProps,
} from "@/constants/innerWorkingsDirectoryData";
import { placeContentToTheRight, displaySection } from "@/utils/articleUtils";
import toast from "react-hot-toast";

const InnerWorkingsDirectory = () => {
  const [initialized, setInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [directoryStyles, setDirectoryStyles] = useState({ width: 0, left: 0 });
  const [directoryData, setDirectoryData] = useState(
    innerWorkingsDirectoryData
  );
  const [currentSection, setCurrentSection] = useState(0);
  const amountOfSections = 11; // Start counting at 0

  const containerEl = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const executionFlow = useMemo(
    () => ({
      "git init": () => {
        setInitialized(true);
        placeContentToTheRight("init");
        displaySection(1);
      },
      "touch text.txt": () => {
        setDirectoryData([
          ...directoryData,
          { type: "file", name: "text.txt", content: "" },
        ]);
        displaySection(2);
      },
      "git status": () => {
        displaySection(3);
      },
    }),
    [directoryData]
  );

  // Initialize Event Listeners
  useEffect(() => {
    const handleCommandEvent = (e: CustomEventInit<string>) => {
      const command = e.detail;
      if (!command) {
        return;
      }

      console.log(currentSection);
      const newSection = currentSection + 1;
      const id = `terminal-input-${newSection}`;

      console.log(id);

      window.setTimeout(() => {
        const nextInputEl = document.getElementById(id);

        if (nextInputEl) {
          nextInputEl.focus({
            preventScroll: true,
          });
        }
      }, 100);

      console.log(newSection);

      if (command === "git init") {
        executionFlow["git init"]();
        setCurrentSection(newSection);
      } else if (command === "touch text.txt") {
        executionFlow["touch text.txt"]();
        setCurrentSection(newSection);
      } else if (command === "git status") {
        executionFlow["git status"]();
        setCurrentSection(newSection);
      }
    };

    window.addEventListener("command", handleCommandEvent);

    return () => {
      window.removeEventListener("command", handleCommandEvent);
    };
  }, [currentSection, executionFlow]);

  // Initialize styles
  useEffect(() => {
    window.setTimeout(() => {
      if (!containerEl.current) return;
      const containerWidth = containerEl.current.offsetWidth;
      const containerMarginLeft = parseInt(
        getComputedStyle(containerEl.current).marginLeft
      );

      const windowWidth = windowSize.width;
      const whitespace = windowWidth - containerWidth;
      const marginRight = whitespace / 4;
      const articleContainerLeft = whitespace / 2 - marginRight;
      const containerOffsetLeft = containerEl.current.offsetLeft;

      setDirectoryStyles({
        width: articleContainerLeft + containerMarginLeft,
        left: containerWidth + containerOffsetLeft,
      });
    }, 400); // 150 ms timeout
  }, [initialized, windowSize.width]);

  const increaseCurrentSection = () => {
    const execustionFlowCommands = Object.keys(executionFlow);

    const nextCommand = execustionFlowCommands[
      currentSection
    ] as keyof typeof executionFlow;

    if (!executionFlow[nextCommand]) {
      return;
    }

    executionFlow[nextCommand]();
    setCurrentSection(currentSection + 1);
  };

  return (
    <>
      <div className="fixed bg-white rounded-md shadow-md right-6 bottom-6">
        <div className="inline-block px-4 py-2 border-r">
          <span>
            {currentSection + 1}/{amountOfSections + 1}
          </span>
        </div>
        <button
          onClick={() => increaseCurrentSection()}
          disabled={currentSection === amountOfSections}
          className={`p-2 cursor ${
            currentSection === amountOfSections ? "" : "hover:text-green-600"
          }`}
        >
          <ChevronRightIcon className="inline-block w-6 h-6" />
        </button>
      </div>
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
                {isOpen && <FoldersAndFiles items={directoryData} />}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

interface FoldersAndFilesProps {
  items: FilePropsOrFolderProps[] | null;
}

const FoldersAndFiles = ({ items }: FoldersAndFilesProps) => {
  if (!items) return null;
  return (
    <ul className="px-3 py-2 list-none opacity-100">
      {items.map((item) => {
        if (item.type === "file") {
          return (
            <li key={item.name} className="pl-4 mt-1">
              {item.name}
            </li>
          );
        } else if (item.type === "folder" && item.content.length > 0) {
          return (
            <FolderItem item={item}>
              <FoldersAndFiles items={item.content} />
            </FolderItem>
          );
        } else if (item.type === "folder" && item.content.length === 0) {
          return (
            <FolderItem item={item}>
              <ul>
                <li className="pl-4 mt-1 italic text-gray-500">No files</li>
              </ul>
            </FolderItem>
          );
        }
      })}
    </ul>
  );
};

interface FolderItemProps {
  item: FolderProps;
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
      {isOpen && children}
    </>
  );
};

export default InnerWorkingsDirectory;
