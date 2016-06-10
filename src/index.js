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
var blockAreas = require('./blockArea')(leftData, rightData);

var blueball = require('./sprites/blueball')
var redball = require('./sprites/redball')
var controller =  require('./mainController')(block, blockAreas, blueball, redball);

stage.addChild(blueball)
stage.addChild(redball)
stage.addChild(block)
initLine(leftData, true)
initLine(rightData, false)
animate();
function animate() {
    renderer.render(stage);
    block.y -= 8
    controller.updateOneTime();
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


function intersection(circle1, circle2) {
   var a, dx, dy, d, h, rx, ry;
   var x, y;
   dx = circle2.x - circle1.x
   dy = circle2.y - circle1.y
   d = Math.sqrt((dy*dy) + (dx*dx));
   if (d > (circle1.width + circle2.width)) {
     return false;
   }
   if (d < Math.abs(circle1.width - circle2.width)) {
       return false;
   }
   a = ((circle1.width * circle2.width) - (circle1.width * circle2.width) + (d*d)) / (2.0 * d) ;
   x = circle1.x + (dx * a/d);
   y = circle1.y + (dy * a/d);
   h = Math.sqrt((circle1.width * circle1.width) - (a*a));
   rx = -dy * (h/d);
   ry = dx * (h/d);
   var first = {
     x: x + rx,
     y: y + ry
   }
   var second = {
    x: x - rx,
    y: y - ry
   }
   return [first, second];
}

