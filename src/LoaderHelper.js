
let resourceDir = '../images/'
let Loaderhelper = {}

Loaderhelper.add = (names, extension) => {
  names.forEach(name => PIXI.loader.add(name, resourceDir + name + '/' + name + '.' + extension))
  return Loaderhelper
}

Loaderhelper.get = (name) => PIXI.loader

module.exports = Loaderhelper
