var aspect;
var pixiLib = require('pixi-lib');
var params = require('./params')
var loader = require('./loader')
var lineGenerator = require('./sprites/lineGenerator')
var view = document.getElementById('game')
var currentDistance = 0
var oneTimes = 5;
var oneWidth = (610-30)/(oneTimes*2);
var operators = [];
var running = true;
var ballRunning = 0;
var ballState = [0, 1, 2];
var currentState = 0;
var currentDirection = 0;
window.onkeydown = function(event) {
    if(running) {
        if(event.keyCode == 76) {
            if(ballRunning == 0) {
                if(currentState != 0) {
                    currentState--;
                  ballRunning = oneTimes;
                  currentDirection = -1;
                }
            }
        } else if(event.keyCode == 82) {
            if(ballRunning == 0) {
                if(currentState != 2) {
                    currentState++;
                    ballRunning = oneTimes;
                  currentDirection = 1;
                }
            }
        }
    }
}
resetSize()
var renderer = PIXI.autoDetectRenderer(640, aspect * 640, { 
  antialias: true,
  view: view,
  transparent:true
});

var stage = new PIXI.Container()
var block = new PIXI.Container()
var leftData = generateRandomGame(1600, true)
var rightData = generateRandomGame(1600, false)
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
    if(ballRunning != 0) {
      ballRunning--;
      blueball.x = blueball.x + currentDirection*oneWidth;
      redball.x = redball.x-currentDirection*oneWidth;
    }
    renderer.render(stage);
    block.y -= 8;
    if(controller.collisionCheck() == false) {
        controller.updateOneTime();
      requestAnimationFrame(animate);
    } else {
        localStorage.pixiScore=controller.yMove/100.0;
        window.location.href="end.html";
    }
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
    result.push({count:10, before:0, isRed:isRed});
  var s = 10
  while (s < sum) {
    var a
    if (s >= sum - 10) {
      a = sum - s
    } else {
      a = parseInt(4 + 6)
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


