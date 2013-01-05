/*global $, Lungo, io*/
/*jshint browser:true, devel:true*/
$(document).ready(function(){ 'use strict';
  var _ = require('app/helpers')
  var ui = require('app/ui')


  // This demo depends on the canvas element
  if(!('getContext' in document.createElement('canvas'))){
    alert('Sorry, it looks like your browser does not support canvas!');
    return false;
  }

  var url = 'http://localhost:3000';

  var doc = $(document)
    , win = $(window)
    , canvas = document.getElementById('board')
  
  if(!('getContext' in document.createElement('canvas'))){
    alert('Ups! Tu navegador no es soportado! :/');
    return false;
  }
  canvas.setAttribute('width', document.width)
  canvas.setAttribute('height', document.height)

  var ctx = canvas.getContext('2d')

  Lungo.init({
    data    : 'Mate (tm)',
    version : '0.0.1'
  });

  var id = Math.round(Date.now() * Math.random())
    , drawing = true
    , clients = {}
    , cursors = {}
    , socket = window.socket =  io.connect(url)
    , prev = {}, down = false

  canvas.onmousedown = 
  canvas.ontouchstart = function(e){
    window.socket.emit('touchstart', e.type)
    e.preventDefault()
    prev.x = e.pageX
    prev.y = e.pageY
    
    down = true
  };

  ctx.strokeStyle = "black";
  

  document.onmousemove =
  document.ontouchmove = function (e){
    if (down) {
      ctx.moveTo(prev.x, e.pageY);
      ctx.lineTo(
        prev.x = e.pageX,
        prev.y = e.pageY
        );
      ctx.stroke()
    }
  }
  canvas.onmouseup =
  canvas.ontouchend = function(e){down = false}


});
