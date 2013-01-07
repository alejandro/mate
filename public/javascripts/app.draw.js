var width = stage.options.width  
  , buttons = []
  , blobs = []
  , prev = { x: 0, y: 0}

function drawTopMenu(x, y){
  console.log('drawing menu')
  var sectors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
    , names = ['color', 'text', 'send', 'chat', 'name', 'call', 'put']
    , sectorWidth = (x / sectors.length)
  
  buttons.forEach(function(el){
    try { el.remove() } catch(e) {}
  })
  buttons = []

  for (var s = 0, l = sectors.length; s < l; ++s) {
    buttons.push(new Rect(s * sectorWidth, 0, sectorWidth, 20)
        .attr('fillColor', sectors[s])
        .attr('name', names[s])
        .addTo(stage)
      );
  }
  
  buttons.forEach(function(btn,i){
    var name = names[i]
    btn.on('click', function(e){
      this.fill('random')
      stage.sendMessage('btn:click', name)
    })
  })
}

function makeBlob(x, y) {
  if (y < 20) return // top menu
  var point = new Rect(0, 0, 2, 2, 1).addTo(stage)

  point.attr({
    fillColor: stage.options.color || 'black',
    x: x,
    y: y,
    scale: 1 + (Math.random() * 2)
  })

  return {
    kill: function() {
      point.animate(Math.random() * 20, { opacity: 0, scale: 0 }, {
        onEnd: function() {
          point.remove()
        }
      })
    }
  }
}

var active = false

stage.on('message:canvas:dpoint', function(point){
  blobs.push(makeBlob(point.x, point.y))
})

stage.on('message:resize', function(size){
  drawTopMenu(size.x)
})

stage.on('pointerup', function(){
  active = false
})
stage.on('pointerdown', function(){
  active = true
})
stage.on('pointermove', function(e) {
  if (active){
    stage.sendMessage('canvas:point', {
      x: e.stageX, y: e.stageY, id: stage.options.id
    })
    blobs.push(makeBlob(e.stageX, e.stageY));
  }
})
