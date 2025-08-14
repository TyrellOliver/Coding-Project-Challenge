import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3025");

const SELF = 0;
const OTHER = 1;
const Home = () => {
  const [sentMessage, setSentMessage] = useState("");
  // const [sentMessages, setSentMessages] = useState([]);
  // const [receivedMessages, setReceivedMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const handleOnClick = () => {
    socket.emit("send_message", { message: sentMessage, room });
    setMessages((prev) => [...prev, { text: sentMessage, sender: SELF }]);
    setSentMessage("");
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
    // setRoom("");
  };

  useEffect(() => {
    socket.on("recevied_message", (data) => {
      setMessages((prev) => [...prev, { text: data.message, sender: OTHER }]);
    });
    return () => {
      socket.off("recevied_message");
    };
  }, [socket]);

  // console.log(sentMessages);
  // console.log(receivedMessages);
  console.log(room);
  console.log(messages);
  return (
    <div className="message_area">
      <div className="message_container">
        <div className={``}>
          {messages.map((message, index) => (
            <div key={index}>
              <p>
                {message.sender === OTHER ? "Other: " : "You: "}
                {message.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <div className="message_input">
          <input
            type="text"
            placeholder="Message..."
            value={sentMessage}
            onChange={(e) => setSentMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key.toLowerCase() === "enter" ? handleOnClick() : ""
            }
          />

          <button type="submit" onClick={handleOnClick}>
            Send
          </button>
        </div>

        <div className="room_num">
          <input
            type="text"
            placeholder="Room number..."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            onKeyDown={(e) =>
              e.key.toLowerCase() === "enter" ? joinRoom() : ""
            }
          />

          <button type="submit" onClick={joinRoom}>
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
