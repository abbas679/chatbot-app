import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { getBotReply } from "./services/chatService";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat-history");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: crypto.randomUUID(),
            sender: "bot",
            text: "Hi! I’m a demo AI chatbot. How can I help you?",
            timestamp: Date.now(),
            status: "sent",
          },
        ];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("chat-history", JSON.stringify(messages));
  }, [messages]);

  // Clear chat button functionality
  const clearChat = () => {
    const initial = {
      id: crypto.randomUUID(),
      sender: "bot",
      text: "Chat cleared. How can I help you?",
      timestamp: Date.now(),
      status: "sent",
    };

    setMessages([initial]);
    localStorage.removeItem("chat-history");
  };

  const sendMessage = async (text) => {
    if (loading) return;

    const userMsg = {
      id: crypto.randomUUID(),
      sender: "user",
      text,
      timestamp: Date.now(),
      status: "sent",
    };

    const typingMsg = {
      id: "typing",
      sender: "bot",
      text: "Typing...",
      timestamp: Date.now(),
      status: "pending",
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setLoading(true);
    setError(null);

    try {
      const reply = await getBotReply([...messages, userMsg]);
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== "typing")
          .concat({
            id: crypto.randomUUID(),
            sender: "bot",
            text: reply,
            timestamp: Date.now(),
            status: "sent",
          }),
      );
    } catch {
      setError("Failed to get response");
      setMessages((prev) => prev.filter((m) => m.id !== "typing"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>AI Chatbot</h2>
        <button className="clear-btn" onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
