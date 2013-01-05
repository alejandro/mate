module.exports = function (server, app){'use strict';
var sio = require('socket.io')

var io = sio.listen(server)

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  setInterval(function (){
    socket.emit('heartbeat', +new Date)
  }, 2500)

  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('error', function (data){
    console.log('ERROR', data)
  })
  socket.on('touchstart', console.log)
  socket.on('deviceready', function (){
    console.log('deviceready\n')
    console.dir(arguments)
  })
});


}
