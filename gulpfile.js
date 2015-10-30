var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['develop:less']);

gulp.task('develop:less', function () {
  return compileLess()
    .pipe(gulp.dest('./' + assertProxyDomain() + '/'));
});

gulp.task('watch', function () {
  assertProxyDomain();
  gulp.watch('./src/**/*.less', ['develop:less']);
});

function compileLess() {
  return gulp.src('./src/theme.less')
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write());
}

function assertProxyDomain() {
  var proxyDomain = process.env.PROXY_DOMAIN;
  if (!proxyDomain) {
    throw new Error('PROXY_DOMAIN is required');
  }
  return proxyDomain;
}
