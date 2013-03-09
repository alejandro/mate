/*global $, Lungo, io*/
/*jshint browser:true, devel:true*/

$(document).ready(function(){ 'use strict';

  var _ = require('app/helpers')
    , ui = require('app/ui')
    , app = Object.create(null)
    , url = '/?id=' + (app.id = btoa(+new Date))
    , socket = io.connect(url)

  var board = document.getElementById('board');
    , id = Math.round(Date.now() * Math.random())
    , drawing = true
    , down = false
    , clients = {}
    , cursors = {}    
    , prev = {}

  Lungo.init({
    data    : 'Mate (tm)',
    version : '0.0.1'
  })

  Lungo.Events.init(ui.Events.lungo)

  

  var canvas = bonsai.run(board, {
    url: 'build/drw.app.js',
    height: document.height,
    width: document.width,
    framerate: 70,
    color: 'black',
    id: app.id
  })

  ui.Events.canvas(app.set('canvas',canvas))

  socket.on('canvas:dpoint', function(data){
    if (data.id !== app.id){
      canvas.sendMessage('canvas:dpoint', data)
    }
  })


  window.onresize = function() {
    board.style.left = (window.innerWidth - 202)/2 - 350 + 'px'
    board.style.top = window.innerHeight/2 - 200 + 'px'
    setTimeout(function(){
      canvas.sendMessage('resize', { x: document.width, y: document.height })
    }, 0)
  }


  window.onresize()
})
