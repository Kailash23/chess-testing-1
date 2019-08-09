var socket = require("socket.io-client")("http://localhost:8080");

var Chess = require("chess.js").Chess;
var chess = new Chess();

function makeRandomMove() {
  var possibleMoves = chess.moves();
  if (chess.game_over()) return;
  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  chess.move(possibleMoves[randomIdx]);
  setTimeout(() => {},500)
  return chess.pgn();
}

socket.on('connect', function(){
  const move = makeRandomMove();
  console.log("sended", move);
  if(move){
    socket.emit("messageToServer", move);
  }
});

socket.on('messageToClient', data => {
  console.log("received",data);
  const move = makeRandomMove();
  if(move){
    socket.emit("messageToServer", makeRandomMove());
  }
})
