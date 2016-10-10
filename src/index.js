
import config from '../config'
import {createRender} from 'pixi-lib'
import loader from './loader'
import carFn from '../images/car'

let render = createRender(document.body)
let stage = new PIXI.Container()
render(stage)

loader.add(config.resource.json, 'json').add(config.resource.png, 'png').load((loader,loadedResourceCache) => {
  console.log(loadedResourceCache)
  let scene = new PIXI.Container()
  let car = carFn()
  car.anchor.x = car.anchor.y = 0.5
  car.x = 320
  car.y = 502
  scene.addChild(car)
  stage.addChild(scene)
})
