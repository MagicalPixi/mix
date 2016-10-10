let resourceDir = '../images/'
let loader = new PIXI.loaders.Loader()
let customLoader = {}

customLoader.textures = {}

customLoader.add = (names, extension) => {
  names.forEach((name) => {
    loader.add(name, resourceDir + name + '/' + name + '.' + extension)
    customLoader.textures[name] = {}
  })
  return customLoader
}

customLoader.load = cb => {
  loader.load((loader, resources) => {
    Object.keys(resources).forEach((key) => {
      customLoader.textures[key] = resources[key].textures
    })
    cb()
  })
}

module.exports = customLoader
