import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { ChevronRightIcon, RefreshIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";

const InnerWorkingsTerminal = () => {
  const [terminalInput, setTerminalInput] = useState("");
  const [cmdExecuted, setCmdExecuted] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEl.current && !cmdExecuted) inputEl.current.focus();
  }, [cmdExecuted]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    const acceptedCommands = ["git init"];

    if (acceptedCommands.includes(terminalInput)) {
      window.dispatchEvent(
        new CustomEvent<string>("command", {
          detail: terminalInput,
        })
      );
      setCmdExecuted(true);
      toast("✨ Git initialized");
    } else if (terminalInput === "Git init") {
      toast("Oops, the G should be lowercase");
    } else {
      toast("Command not recognized");
    }
  };

  const reset = () => {
    setCmdExecuted(false);
    setTerminalInput("");

    window.dispatchEvent(
      new CustomEvent<string>("command", {
        detail: "reset git init",
      })
    );
  };

  return (
    <>
      <div
        onClick={() => {
          if (inputEl.current) inputEl.current.focus();
        }}
        className="relative flex items-center px-4 py-2 mt-8 mb-10 text-white bg-gray-900 border-4 border-gray-600 rounded"
      >
        <ChevronRightIcon className="inline w-4 h-4 mr-2 text-gray-500" />
        <input
          ref={inputEl}
          disabled={cmdExecuted}
          type="text"
          className={`block w-full pr-10 font-mono text-white bg-gray-900 outline-none ${
            cmdExecuted && "cursor-not-allowed"
          }`}
          value={terminalInput}
          onKeyDown={handleKeyDown}
          onChange={(e) => setTerminalInput(e.target.value)}
        />
        {cmdExecuted && (
          <RefreshIcon
            onClick={reset}
            className="absolute right-0 inline w-6 h-6 mr-2 text-gray-500 transition-colors duration-150 ease-in cursor-pointer hover:text-white"
          />
        )}
      </div>
    </>
  );
};

export default InnerWorkingsTerminal;
