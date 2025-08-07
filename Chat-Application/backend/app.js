const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("sent message: ", data);
    // socket.broadcast.emit("recevied_message", data);
    socket.to(data.room).emit("recevied_message", data);
  });

  socket.on("join_room", (data) => {
    console.log("The room is:", data);
    socket.join(data);
  });
});

// httpServer.listen(3000);

module.exports = { app, httpServer };
