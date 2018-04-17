const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket){

  socket.on('join', (param) => {
    socket.join(param.room);
    socket.to(param.room).emit('nice game', "let's play a game");
    socket.on('drawing', (data) => {
      socket.to(param.room).emit('drawing', data);
    });
    socket.on('reset', (data) => {
      socket.to(param.room).emit('reset', data);
    });
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
