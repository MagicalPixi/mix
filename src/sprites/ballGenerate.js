var generator = function(color) {
  var graphics = new PIXI.Graphics()
  graphics.beginFill(color, 1)
  graphics.drawCircle(0, 0, 20)
  graphics.endFill()
  return graphics
}

module.exports = generator
