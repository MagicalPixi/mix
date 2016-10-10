
import Loaderhelper from './Loaderhelper'
import config from '../config'
import lib from '../lib'

Loaderhelper.add(config.resource.png, 'png').add(config.resource.json, 'json')
let screen = lib.CreateScreen()
let init = () => {
  let t = new PIXI.Text('', {fontSize: '30px', fontFamily: 'helvetica-light', fill: '#ffffff', stroke: '#ffffff'
, strokeThickness: 2})
  t.anchor.x = t.anchor.y = 0.5
  t.text = 'Hello Pixi Game'
  t.x = 320,
  t.y = 502
  screen.addChild(t)
}

if (config.resource.png.length > 0 && config.resource.json.length > 0) {
  PIXI.loader.load((loader, resources) => {
    init()
  })
} else {
  init()
}
