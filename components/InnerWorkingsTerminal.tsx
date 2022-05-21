import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { ChevronRightIcon, RefreshIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { displaySection } from "@/utils/articleUtils";
import { motion } from "framer-motion";

type options = {
  expectedCommand: "git init" | "touch text.txt";
  step: number;
};

const gitStatusMsg = `On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        text.txt

nothing added to commit but untracked files present (use "git add" to track)`;

const InnerWorkingsTerminal = ({ expectedCommand, step }: options) => {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<null | string>(null);
  const [cmdExecuted, setCmdExecuted] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEl.current && !cmdExecuted) inputEl.current.focus();
  }, [cmdExecuted]);

  const checkIfCommandIsValid = (command: string) => {
    if (expectedCommand === "git init") {
      switch (command) {
        case "git init":
          toast("✨ Git initialized");
          return true;
        case "Git init":
          toast("Oops, the G should be lowercase");
          return false;
        default:
          toast("Command not recognized");
          return false;
      }
    } else if (expectedCommand === "touch text.txt") {
      switch (command) {
        case "touch text.txt":
          toast("✨ File created");
          return true;
        case "Touch text.txt":
          toast("Oops, the T should be lowercase");
          return false;
        default:
          toast("Command not recognized");
          return false;
      }
    } else if (expectedCommand === "git status") {
      switch (command) {
        case "git status":
          setTerminalOutput(gitStatusMsg);
          return true;
        case "Touch text.txt":
          toast("Oops, the T should be lowercase");
          return false;
        default:
          toast("Command not recognized");
          return false;
      }
    } else {
      toast("Something went wrong");
      return false;
    }
  };

  const dispatchTerminalEvent = (command: string) => {
    window.dispatchEvent(
      new CustomEvent<string>("command", {
        detail: command,
      })
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    const commandIsValid = checkIfCommandIsValid(terminalInput);

    if (commandIsValid) {
      dispatchTerminalEvent(terminalInput);
      setCmdExecuted(true);
    }
  };

  return (
    <div className="mb-10 font-mono">
      <div
        onClick={() => {
          if (inputEl.current) inputEl.current.focus();
        }}
        className={`${
          terminalOutput
            ? "rounded-t border-4 border-b-0"
            : "rounded-b border-4"
        } relative flex items-center px-4 py-2 mt-8 text-white bg-gray-900 border-gray-600`}
      >
        <ChevronRightIcon className="inline w-4 h-4 mr-2 text-green-600" />
        <input
          ref={inputEl}
          id={`terminal-input-${step}`}
          disabled={cmdExecuted}
          type="text"
          className={`block w-full pr-10 text-white bg-gray-900 outline-none ${
            cmdExecuted && "cursor-not-allowed"
          }`}
          value={terminalInput}
          onKeyDown={handleKeyDown}
          onChange={(e) => setTerminalInput(e.target.value)}
        />
      </div>
      {terminalOutput ? (
        <motion.div
          initial={{ top: -10 }}
          animate={{ top: 0 }}
          className="pt-2 pb-6 pl-10 pr-4 text-white whitespace-pre-line bg-gray-200 bg-gray-900 border-4 border-t-0 border-gray-600 rounded-b-md"
        >
          <span className="block">{terminalOutput}</span>
        </motion.div>
      ) : null}
    </div>
  );
};

export default InnerWorkingsTerminal;
