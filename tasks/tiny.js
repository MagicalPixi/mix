import tinyPng from 'gulp-tinypng'
import path from 'path'
var key = '_U9AFU6XG2QpeMT3__2pWl5pOW10NvfL'

var pngDir = path.resolve(__dirname,'../images/*/*.png')
var dest = path.resolve(__dirname,'../compress/')
var compress = path.resolve(__dirname,'../compress/*/*.png')
var originDir = path.resolve(__dirname,'../images/')

module.exports = gulp => {
  gulp.task('tiny', () => gulp.src(pngDir).pipe(tinyPng(key)).pipe(gulp.dest(dest)))
  gulp.task('move', () => gulp.src(compress).pipe(gulp.dest(originDir)))
}
