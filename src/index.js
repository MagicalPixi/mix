
import loader from './loader'
import config from '../config'

loader.add(config.resource.png, 'png').add(config.resource.json, 'json').load(() => {
  console.log(loader.textures)
})
