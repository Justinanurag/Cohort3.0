import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [socket, setSocket] = useState(null);
  const inputRef=useRef();

  function sendMessage() {
    if (!socket) return;
    const message=inputRef.current.value;
    socket.send(message);
  }

  useEffect(() => {
    fetch("http://localhost:3000/users");
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data);
    };

    // Cleanup when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Message......" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
