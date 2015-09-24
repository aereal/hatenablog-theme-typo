var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['less']);

gulp.task('less', function () {
  return compileLess()
    .pipe(gulp.dest('./'));
});

gulp.task('develop:less', function () {
  var proxyDomain = process.env.PROXY_DOMAIN;
  if (!proxyDomain) {
    throw new Error('PROXY_DOMAIN is required');
  }
  return compileLess()
    .pipe(gulp.dest('./' + proxyDomain + '/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.less', ['develop:less']);
});

function compileLess() {
  return gulp.src('./src/theme.less')
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write());
}
