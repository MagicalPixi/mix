var aspect;
var pixiLib = require('pixi-lib');
var params = require('./params')
var loader = require('./loader')
var view = document.getElementById('game')
resetSize()
var renderer = PIXI.autoDetectRenderer(640, aspect * 640, { 
  antialias: true,
  view: view,
  transparent:true
});
var stage = new PIXI.Container()
var blueball = require('./sprites/blueball')
var redball = require('./sprites/redball')
stage.addChild(blueball)
stage.addChild(redball)

animate();
function animate() {
    renderer.render(stage);
    requestAnimationFrame( animate );
}

window.onresize = function() {
  resetSize()
  renderer.resize(640, aspect * 640)
}

function resetSize() {
  aspect = document.body.clientHeight / document.body.clientWidth
}

