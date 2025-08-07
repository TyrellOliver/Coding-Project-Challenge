import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3025");

function App() {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [room, setRoom] = useState("");

  const handleOnClick = () => {
    socket.emit("send_message", { message, room });
    setSentMessages((prev) => [...prev, message]);
    setMessage("");
  };

  // const handleTextChange = (e) => {
  //   setMessage(e.target.value);
  //   setRoom(e.target.value);
  // };

  const joinRoom = () => {
    socket.emit("join_room", room);
    // setRoom("");
  };

  useEffect(() => {
    socket.on("recevied_message", (data) => {
      setReceivedMessages((prev) => [...prev, data.message]);
    });
    return () => {
      socket.off("recevied_message");
    };
  }, [socket]);

  console.log(room);

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
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) =>
          e.key.toLowerCase() === "enter" ? handleOnClick() : ""
        }
      />
      <button type="submit" onClick={handleOnClick}>
        Send
      </button>
      <br />
      <input
        type="text"
        placeholder="Room number..."
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        onKeyDown={(e) => (e.key.toLowerCase() === "enter" ? joinRoom() : "")}
      />
      <button type="submit" onClick={joinRoom}>
        Send
      </button>
    </>
  );
}

export default App;
