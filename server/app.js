import { Server, Socket } from "socket.io";
const io = new Server(8000);

let users = [];

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("new-user", (name) => {
    users.push(name);
    socket.broadcast.emit("user-connected", name);
  });
});
