
let CreateScreen = ({width = 640, height = 1004} = {}) => {
  let renderer = PIXI.autoDetectRenderer(width, height)
  document.body.appendChild(renderer.view)
  let stage = new PIXI.Container()
  let animation = () => {
    requestAnimationFrame(animation)
    renderer.render(stage)
  }
  animation()
  return stage
}

module.exports = CreateScreen
