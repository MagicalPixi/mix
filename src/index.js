var pixiLib = require('pixi-lib');
var params = require('./params')
var loader = require('./loader')
var view = document.getElementById('game')
var renderer = PIXI.autoDetectRenderer(640, 1004, { 
  antialias: true,
  view: view,
  transparent:true
});
var stage = new PIXI.Container()
var blueball = require('./sprites/blueball')
stage.addChild(blueball)

animate();
function animate() {
    renderer.render(stage);
    requestAnimationFrame( animate );
}

