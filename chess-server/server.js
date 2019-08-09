const express = require("express");
const app = express();
const socketio = require("socket.io");

const expressServer = app.listen(8080);
const io = socketio(expressServer);

io.on("connection", socket => {
  console.log("connected!");

  socket.on("messageToServer", data => {
    socket.emit("messageToClient", data);
  });
  
});
