import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3025");

function App() {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message: message });
  };
  const handleTextChange = (e) => {
    // console.log(e.target.value)
    setMessage(e.target.value);
  };

  // console.log(socket);
  console.log(message);
  return (
    <>
      <input
        type="text"
        placeholder="Type your message..."
        onChange={handleTextChange}
      />
      <button type="submit" onClick={sendMessage}>
        Send
      </button>
    </>
  );
}

export default App;
