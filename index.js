const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const port = process.env.PORT || 3030;
const NEW_MESSAGE_EVENT = "new-message-event";

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: true,
  origins: ["localhost:3000"],
});

app.use(cors());

// Hardcoding a room here - you can create multiple rooms as needed instead
const room = "general";

io.on("connection", (socket) => {
  socket.join(room);

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    io.in(room).emit(NEW_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    socket.leave(room);
  });
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
