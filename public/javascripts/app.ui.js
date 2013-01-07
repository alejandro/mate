define('app/ui', function (){'use strict';
  var _ = require('lungo')
  
  var Lungo = { // lungo events
    'tap a[data-action=login]': function (){
      _.Notification.show(
        'Bienvenido','Un placer tenerte de nuevo','message', false, 2, function (){
        _.Router.section('home')
      })
    }
  },

  Canvas = function (canvas){

    var clicks
    
    clicks = {
      'chat': function (){
        console.log('chat clicked')
      }
    }

    canvas.on('message:btn:click', function(el){
      if (clicks[el]) return clicks[el]()
    })
    canvas.on('message:canvas:point', function (coords){
      console.log('poiint')
      socket.emit('canvas:point', coords)
    })
  }


  return {
    version:'0.0.1',
    Events: {
      lungo: Lungo,
      canvas: Canvas
    },
  }
})
