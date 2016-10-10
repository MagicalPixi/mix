import path from 'path'
import rename from 'gulp-rename'
import download from 'gulp-download'
import unzip from 'gulp-unzip'
import fs from 'fs'
import {swapn} from 'child_process'
import config from '../config'
import runSequence from 'run-sequence'
var server = 'http://back.magicalpixi.com/'

var names = config.resource.png.concat(config.resource.json)
var urls = []
var dir = path.resolve(__dirname, '../images/')
module.exports = (gulp) => {
  gulp.task('prepare', () => {
    if (!names || names.length < 1) return
    urls = names.map(name => server + 'api/buildDownloadZip?name=' + name)
  })
  gulp.task('download', () => {
    let i = 0
    if (!names || names.length < 1) return
    return download(urls).pipe(rename(path => {
      path.basename = names[i]
      path.extname = '.zip'
      return path
    })).pipe(gulp.dest(args => {
      let nameIndex = parseInt(i++)
      return path.join(dir, names[nameIndex])
    }))
  })
  gulp.task('unzip', () => {
    if (!names || names.length < 1) return
    names.map(name => {
      let dist = path.resolve(__dirname, '../images/' + name)
      let zip = path.resolve(__dirname, '../images/' + name + '/' + name + '.zip')
      gulp.src(zip).pipe(unzip()).pipe(gulp.dest(dist))
    })
  })
  gulp.task('down', callback => {
    runSequence('prepare', 'download', 'unzip', callback)
  })
}
