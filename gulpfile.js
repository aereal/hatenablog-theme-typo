var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass']);

gulp.task('sass', function () {
  return compileSass()
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  assertProxyDomain();
  gulp.watch('./src/**/*.scss', ['sass']);
});

function compileSass() {
  return gulp.src('./src/theme.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
}

function assertProxyDomain() {
  var proxyDomain = process.env.PROXY_DOMAIN;
  if (!proxyDomain) {
    throw new Error('PROXY_DOMAIN is required');
  }
  return proxyDomain;
}
