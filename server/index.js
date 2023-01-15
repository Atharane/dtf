const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http").Server(app);

const PORT = 4000;

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //Listen & log the message to the console
  socket.on("message", (data) => {
      console.log(data);
      socketIO.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("💀: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Up & Running",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
