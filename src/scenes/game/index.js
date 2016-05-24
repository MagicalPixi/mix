var pixiLib = require('pixi-lib')
var loader = require('../../loader')
var stage = new PIXI.Container()
module.exports = function (render) {
  render(stage)
}
