module.exports = function (server, app){'use strict';

var sio = require('socket.io')
  , io = sio.listen(server)
  , draw = io.of('/draw')
  , chat = io.of('/chat')


io.sockets.on('connection', function(socket){
  socket.on('canvas:point', function (e){ // todo make this scalable
    io.sockets.emit('canvas:dpoint', e)
  })
})
}
