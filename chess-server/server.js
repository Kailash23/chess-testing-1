const express = require("express");
const app = express();
const socketio = require("socket.io");

const expressServer = app.listen(8080);
const io = socketio(expressServer);

io.on("connection", socket => {
  socket.on("messageToServer", data => {
    console.log(data)
    socket.emit("messageToClient", data)
  });
});
