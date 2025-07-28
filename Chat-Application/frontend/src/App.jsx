import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3025");

function App() {
  const sendMessage = () => {};

  console.log(socket);
  return (
    <>
      <form className="message-form">
        <input type="text" placeholder="Type your message..." />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </>
  );
}

export default App;
