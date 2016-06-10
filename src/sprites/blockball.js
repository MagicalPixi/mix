/**
 * Created by zjs on 16/6/10.
 */
var generator = function(y, radius) {
    var graphics = new PIXI.Graphics()
    graphics.beginFill(0xF06050, 1)
    graphics.drawCircle(320, y, radius)
    graphics.endFill()
    return graphics
}

module.exports = generator
