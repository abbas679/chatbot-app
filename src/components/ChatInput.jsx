import { useEffect, useRef, useState } from "react";

const MAX_CHARS = 300;

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); // auto-focus on load
  }, []);

  const send = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <input
          ref={inputRef}
          aria-label="Chat input"
          placeholder="Type a message..."
          value={input}
          maxLength={MAX_CHARS}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <span className="counter">
          {input.length}/{MAX_CHARS}
        </span>
      </div>
      <button onClick={send} disabled={disabled || !input.trim()}>
        Send
      </button>
    </div>
  );
}
