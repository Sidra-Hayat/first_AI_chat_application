import { useState, useRef, useEffect } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg = { role: "user", content: text };
    const aiMsg = { role: "ai", content: "", streaming: true };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunkText = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = { ...last, content: last.content + chunkText };
          return updated;
        });
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], streaming: false };
        return updated;
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setMessages((prev) => prev.slice(0, -1)); // remove the empty ai bubble
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-dot" />
          StudyBuddy
        </div>
        <span className="tagline">ask anything · study smarter</span>
      </header>

      <main className="chat-area">
        {messages.length === 0 && (
          <div className="empty-state">
            <h1>What are we figuring out today?</h1>
            <p>Ask a study question, get an explanation, or just chat.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`bubble-row ${msg.role}`}>
            {msg.role === "ai" && <span className="tab" />}
            <div className="bubble">

{
msg.role === "ai" ? (

<ReactMarkdown remarkPlugins={[remarkGfm]}>
{msg.content}
</ReactMarkdown>

) : (

msg.content

)

}

{msg.streaming && <span className="cursor" />}

</div>
          </div>
        ))}

        {loading && (
          <div className="bubble-row ai">
            <span className="tab" />
            <div className="bubble thinking">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        {error && <div className="error-banner">⚠ {error}</div>}
        <div ref={bottomRef} />
      </main>

      <footer className="input-bar">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            autoResize(e.target);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type your question... (Shift+Enter for new line)"
          rows={1}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? "···" : "Send"}
        </button>
      </footer>
    </div>
  );
}

export default App;