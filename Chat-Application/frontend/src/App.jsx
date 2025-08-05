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
    // setSentMessages(message);
  };

  const handleTextChange = (e) => {
    // console.log(e.target.value)
    setMessage(e.target.value);
    // console.log(e);
  };

  // socket.on("recevied_message", (data) => {
  //   console.log(data);
  //   setReceivedMessages((prev) => [...prev, data.message]);
  //   // socket.emit("sent_message",(data)=>{})
  // });

  // console.log(message);
  // console.log("sentMessage:", sentMessages);
  console.log("receivedMessages:", receivedMessages);

  useEffect(() => {
    console.log("hello world");
    socket.on("recevied_message", (data) => {
      console.log("receievedMessage: ", data); // {message: "hi"}
      setReceivedMessages((prev) => {
        // console.log("The prev: ", prev);
        return [...prev, data.message];
      });
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
        {/* {receivedMessages} */}
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
