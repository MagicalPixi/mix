/**
 * Created by zjs on 16/6/10.
 */
var generator = function(color, radius) {
    var graphics = new PIXI.Graphics()
    graphics.beginFill(color, 1)
    graphics.drawCircle(0, 0, radius)
    graphics.endFill()
    return graphics
}

module.exports = generator
