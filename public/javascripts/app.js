/*global $, Lungo, io*/
/*jshint browser:true, devel:true*/

$(document).ready(function(){ 'use strict';


  var Application = function (){

  }

  var _ = require('app/helpers')
  var ui = require('app/ui')
  var app = {}


  // This demo depends on the canvas element
  if(!('getContext' in document.createElement('canvas'))){
    alert('Sorry, it looks like your browser does not support canvas!');
    return false;
  }

  var url = 'http://localhost:3000';

  var doc = $(document)
    , win = $(window)
  
  if(!('getContext' in document.createElement('canvas'))){
    alert('Ups! Tu navegador no es soportado! :/');
    return false;
  }

  Lungo.init({
    data    : 'Mate (tm)',
    version : '0.0.1'
  })

  Lungo.Events.init(ui.Events.lungo)

  var id = Math.round(Date.now() * Math.random())
    , drawing = true
    , clients = {}
    , cursors = {}
    , socket = window.socket =  io.connect(url)
    , prev = {}, down = false

  var player = document.getElementById('board');

  var canvas = bonsai.run(player, {
    url: 'build/drw.app.js',
    height: document.height,
    width: document.width,
    framerate: 70,
    color: 'black',
    id: (app.id = btoa(+new Date))
  })

  ui.Events.canvas(canvas)

  socket.on('canvas:dpoint', function(data){
    if (data.id !== app.id){
      canvas.sendMessage('canvas:dpoint', data)
    }
  })


  window.onresize = function() {
    player.style.left = (window.innerWidth - 202)/2 - 350 + 'px'
    player.style.top = window.innerHeight/2 - 200 + 'px'
    setTimeout(function(){
      canvas.sendMessage('resize', { x: document.width, y: document.height })
    }, 0)
  }


  window.onresize()
})
