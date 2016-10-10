import qiniu from 'gulp-qiniu'
import path from 'path'

var imageDir = path.resolve(__dirname, '../images/**/*.png')
var config = {
    accessKey: "EyEwm6Bjadr4ojSFxpKWt6k-PoyT99D5l_qMCEaL",
    secretKey: "xOUHlBygVg_dIxPcgWmEVu7GG5jl_XVQ57mrV7o0",
    bucket: "pixigame",
    private: false
}
var extra = {
    dir: 'game_name/',
    versioning: true,
    versionFile: './cdn.json',
    concurrent: 10
}

module.exports = gulp => {
  gulp.task('qiniu', () => {
    gulp.src(imageDir).pipe(qiniu(config, extra))
  })
}
