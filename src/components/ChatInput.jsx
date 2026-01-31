import { useEffect, useRef, useState } from "react";

const MAX_CHARS = 300;

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState(""); // state for input
  const inputRef = useRef(null);

  // Auto-focus input on load
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const sendMessage = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput(""); // clear input after sending
  };

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          value={input} // bind state here
          maxLength={MAX_CHARS}
          onChange={(e) => setInput(e.target.value)} // important: update state
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        {/* Character counter */}
        <span className="counter">
          {input.length}/{MAX_CHARS}
        </span>
      </div>

      <button onClick={sendMessage} disabled={!input.trim() || disabled}>
        Send
      </button>
    </div>
  );
}
