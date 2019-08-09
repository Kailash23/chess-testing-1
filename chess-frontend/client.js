var socket = require("socket.io-client")("http://localhost:8080");

var Chess = require("chess.js").Chess;
var chess = new Chess();

function makeRandomMove() {
  var possibleMoves = chess.moves();
  if (chess.game_over()) return;
  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  chess.move(possibleMoves[randomIdx]);
  return chess.pgn();
}

socket.on("connect", function() {
  setInterval(emit, 1000)
});

function emit(){
  console.log('emit')
  const data = makeRandomMove();
  console.log("Sended: ", data)
  if(data){
    socket.emit("messageToServer", data);
  } 
}

socket.on("messageToClient", data => {
  console.log("Received: ", data);
});
