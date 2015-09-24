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

gulp.task('watch', function () {
  gulp.watch('./src/**/*.less', ['less']);
});

function compileLess() {
  return gulp.src('./src/theme.less')
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write());
}
