const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

io.on("connection", (socket) => {});

// httpServer.listen(3000);

module.exports = { app, httpServer };
