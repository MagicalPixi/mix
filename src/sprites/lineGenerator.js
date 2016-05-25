var generator = function(color, height) {
  var graphics = new PIXI.Graphics()
  graphics.beginFill(color, 1)
  graphics.drawRect(0, 0, 10, height, 0)
  graphics.endFill()
  return graphics
}
module.exports = generator
