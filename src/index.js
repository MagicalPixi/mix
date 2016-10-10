
import Loaderhelper from './Loaderhelper'
import config from '../config'

Loaderhelper.add(config.resource.png, 'png').add(config.resource.json, 'json')
PIXI.loader.load((loader, resources) => {

})
