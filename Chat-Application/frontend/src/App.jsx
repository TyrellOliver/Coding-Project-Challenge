import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3025");

function App() {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const handleOnClick = () => {
    socket.emit("send_message", { message: message });
    setSentMessages((prev) => [...prev, message]);
  };

  const handleTextChange = (e) => {
    // console.log(e.target.value)
    setMessage(e.target.value);
  };

  socket.on("recevied_message", (data) => {
    console.log(data);
    setReceivedMessages((prev) => [...prev, data.message]);
    // socket.emit("sent_message",(data)=>{

    // })
  });

  // console.log(message);
  // console.log(sentMessages);
  return (
    <>
      <div>
        <p>Sent</p>
        {sentMessages.map((message) => (
          <p>{message}</p>
        ))}
      </div>
      <div>
        <p>Received</p>

        {receivedMessages.map((message) => (
          <p>{message}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        onChange={handleTextChange}
      />
      <button type="submit" onClick={handleOnClick}>
        Send
      </button>
    </>
  );
}

export default App;
