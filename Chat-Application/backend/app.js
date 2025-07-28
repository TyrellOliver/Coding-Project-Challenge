const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require(cors);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3025",
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

io.on("connection", (socket) => {});

// httpServer.listen(3000);

module.exports = { app, httpServer };
