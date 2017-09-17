
var gulp = require('gulp');
var package = require('./package.json');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

gulp.task('minify-css', function() {
  return gulp.src(['public/css/*.css'])
    .pipe(cleanCSS({
      compability: 'ie8'
    }))
    .pipe(gulp.dest('public/css.min'));
});

gulp.task('concat-css', function() {
  return gulp.src([
      'public/css.min/bootstrap.css',
      'public/css.min/jquery.noty.css',
      'public/css.min/noty_theme_default.css',
      'public/css.min/theme.css'
    ])
    .pipe(concat('source.' + package.version + '.css'))
    .pipe(gulp.dest('public/dst/'));
});

gulp.task('concat-js', function() {
  return gulp.src([
      'public/js/jquery.min.js',
      'public/js/jquery.easing.1.3.js',
      'public/js/bootstrap.min.js',
      'public/js/jquery.maskedinput.min.js',
      'public/js/snap.svg-min.js',
      'public/js/jquery.noty.js',
      'public/js/jquery.scrollme.min.js',
      'public/js/neftezip.js'
    ])
    .pipe(concat('source.' + package.version + '.js'))
    .pipe(gulp.dest('public/dst/'));
});

gulp.task('default', ['minify-css', 'concat-css', 'concat-js']);
