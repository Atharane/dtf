import express from "express";
import http from "http";
import uuidv4 from "uuidv4";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const messages = new Set();
const users = new Map();

const defaultUser = {
  id: "anon",
  name: "Anonymous",
};

app.get("/", (req, res) => {
  res.send({
    message: "Up and running",
  });
});

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("getMessages", () => this.getMessages());
    socket.on("message", (value) => this.handleMessage(value));
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendMessage(message) {
    this.io.sockets.emit("message", message);
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value) {
    console.log(
      "🚀 ~ file: app.js:45 ~ Connection ~ handleMessage ~ value",
      value
    );

    const message = {
      id: uuidv4(),
      user: users.get(this.socket) || defaultUser,
      value,
      time: Date.now(),
    };

    messages.add(message);
    this.sendMessage(message);

    setTimeout(() => {
      messages.delete(message);
      this.io.sockets.emit("deleteMessage", message.id);
    }, messageExpirationTimeMS);
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function chat(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

server.listen(3000, () => {
  console.log("listening on *:3000");
});
