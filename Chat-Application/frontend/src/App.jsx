import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3025");

function App() {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const handleOnClick = () => {
    socket.emit("send_message", { message });
    setSentMessages((prev) => [...prev, message]);
    setMessage("");
  };

  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    socket.on("recevied_message", (data) => {
      setReceivedMessages((prev) => [...prev, data.message]);
    });
    return () => {
      socket.off("recevied_message");
    };
  }, [socket]);

  return (
    <>
      <div>
        <p>Sent:</p>
        {sentMessages.map((message, index) => (
          <div key={index}>
            <p>{message}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Received:</p>

        {receivedMessages.map((message, index) => (
          <div key={index}>
            <p>{message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleTextChange}
        onKeyDown={(e) =>
          e.key.toLowerCase() === "enter" ? handleOnClick() : ""
        }
      />
      <button type="submit" onClick={handleOnClick}>
        Send
      </button>
    </>
  );
}

export default App;
