import gulp from 'gulp'
import qiniu from './tasks/qiniu'
import tiny from './tasks/tiny'
import down from './tasks/down'

down(gulp)
qiniu(gulp)
tiny(gulp)

module.exports = gulp
