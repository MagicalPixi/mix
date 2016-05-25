var aspect;
var pixiLib = require('pixi-lib');
var params = require('./params')
var loader = require('./loader')
var lineGenerator = require('./sprites/lineGenerator')
var view = document.getElementById('game')
var currentDistance = 0
resetSize()
var renderer = PIXI.autoDetectRenderer(640, aspect * 640, { 
  antialias: true,
  view: view,
  transparent:true
});
var stage = new PIXI.Container()
var block = new PIXI.Container()
var leftData = generateRandomGame(160, true)
var rightData = generateRandomGame(160, false)
var blueball = require('./sprites/blueball')
var redball = require('./sprites/redball')

stage.addChild(blueball)
stage.addChild(redball)
stage.addChild(block)

initLine(leftData, true)
initLine(rightData, false)
animate();
function animate() {
    renderer.render(stage);
    block.y -= 8
    requestAnimationFrame(animate);
}

window.onresize = function() {
  resetSize()
  renderer.resize(640, aspect * 640)
}

function resetSize() {
  aspect = document.body.clientHeight / document.body.clientWidth
}

function generateRandomGame(sum, isRed) {
  var result = []
  var currentColor = isRed
  var s = 0
  while (s < sum) {
    var a
    if (s >= sum - 6) {
      a = sum - s
    } else {
      a = parseInt(Math.random() * 5 + 2)
    }
    var obj = {
      count: a,
      before: s,
      isRed: currentColor
    }
    result.push(obj)
    s += a 
    currentColor = !currentColor
  }
  return result
}

function initLine(data, left) {
  for (var i in data) {
    var obj = data[i]
    var line = lineGenerator(obj.isRed ? 0xF06050 : 0x415C71, 80 * obj.count)
    line.y = 80 * obj.before
    line.x = left ? 0 : 630
    block.addChild(line)
  }
}

