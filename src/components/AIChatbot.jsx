import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { chatWithAI } from "../services/geminiService";
import "./AIChatbot.css";

const SUGGESTIONS = [
  "What's the best time to visit?",
  "Top 3 things to do?",
  "How many days should I spend?",
  "What's the local food like?",
  "Is it budget-friendly?",
];

function AIChatbot({ activeDestination }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm your travel assistant. Ask me anything about destinations — best times to visit, what to see, local tips, and more!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Trap focus when chat is open
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  async function handleSend(text) {
    const messageText = (text || input).trim();
    if (!messageText || loading) return;

    const userMessage = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const historyForAPI = newMessages
        .filter((m) => m.role !== "system")
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const destinationContext = activeDestination
        ? `The user is currently viewing ${activeDestination.name}, ${activeDestination.country}. It's in ${activeDestination.continent}. Description: ${activeDestination.description}. Best time to visit: ${activeDestination.bestTimeToVisit}. Famous places: ${activeDestination.famousPlaces?.map((p) => p.name).join(", ")}.`
        : null;

      const reply = await chatWithAI(historyForAPI, destinationContext);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process that right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        className={`chatbot-toggle ${open ? "chatbot-toggle-hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Open AI travel assistant"
      >
        <MessageCircle size={24} />
        <span className="chatbot-toggle-pulse" />
      </button>

      {/* Chat panel */}
      <div
        className={`chatbot-panel ${open ? "chatbot-panel-open" : ""}`}
        role="dialog"
        aria-label="AI Travel Assistant"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">✈️</div>
            <div>
              <h3 className="chatbot-header-title">Travel Assistant</h3>
              <span className="chatbot-header-status">
                {activeDestination
                  ? `Exploring ${activeDestination.name}`
                  : "Online"}
              </span>
            </div>
          </div>
          <button
            className="chatbot-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chatbot-msg ${
                msg.role === "user" ? "chatbot-msg-user" : "chatbot-msg-ai"
              }`}
            >
              <div className="chatbot-msg-bubble">
                {msg.content.split("\n").map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < msg.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chatbot-msg chatbot-msg-ai">
              <div className="chatbot-msg-bubble chatbot-typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && !loading && (
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="chatbot-suggestion-chip"
                onClick={() => handleSend(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            className="chatbot-input"
            type="text"
            placeholder="Ask about any destination…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="chatbot-send"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            {loading ? <Loader2 size={18} className="chatbot-send-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </>
  );
}

export default AIChatbot;
