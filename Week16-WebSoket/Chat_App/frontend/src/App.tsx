import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState(["Hello Anurag!", "Hello"]);
  const [input, setInput] = useState("");
  const wsRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // ✅ Use ws:// instead of http:// for WebSocket
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => console.log("✅ Connected to WebSocket server");
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("❌ WebSocket disconnected");

    wsRef.current = ws;
    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }
    return () => ws.close();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Send to WebSocket server
    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: { message: input },
      })
    );

    // Also add to local message list
    setMessages((prev) => [...prev, `You: ${input}`]);
    setInput("");
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-between items-center text-white">
      {/* Header */}
      <div className="w-full bg-gray-800 p-4 text-center text-lg font-semibold shadow-md">
        Chat with AI 💬
      </div>

      {/* Chat area */}
      <div className="flex-1 w-full max-w-3xl overflow-y-auto p-4 space-y-3 bg-gray-900">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.startsWith("You:") ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.startsWith("You:")
                  ? "bg-blue-600"
                  : "bg-gray-700"
              } text-sm p-3 rounded-2xl max-w-[70%]`}
            >
              {msg}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="w-full bg-gray-800 p-3 flex items-center gap-2 shadow-inner">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 transition-all px-5 py-2 rounded-full font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
