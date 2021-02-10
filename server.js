const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
});

var player = 0

io.on('connection', (socket) => {
    player++

    io.emit("player", player);

    socket.on('disconnect', () => {
        player--
        io.emit("player", player);
    });

    socket.on('adminQuestion', (result) => {
      socket.broadcast.emit('question', result)
    })

    socket.on('adminCountdown', (result) => {
      socket.broadcast.emit('countdown', result)
    })

    socket.on('adminAnswers', (result) => {
      socket.broadcast.emit('answers', result)
    })

    socket.on('adminEndGame', (result) => {
      socket.broadcast.emit('endGame', result)
    })
});

http.listen(3034, () => {
  console.log('listening on *:3034');
});