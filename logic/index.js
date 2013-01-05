module.exports = function (server, app){'use strict';

var sio = require('socket.io')
  , io = sio.listen(server)
  , draw = io.of('/draw')
  , chat = io.of('/chat')


}
