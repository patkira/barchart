// Include gulp
var gulp = require('gulp');

// Polyfill so we don't need >= node 0.12
require('es6-promise').polyfill();

// Include plugins
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var bless = require('gulp-bless');

// Turn sass into css, prefix, minify and bless
gulp.task('scss', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false,
      remove: false // set this to true if parsing library or legacy css code
    }))
    .pipe(minifyCSS())
    .pipe(bless())
    .pipe(gulp.dest('css/'));
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['scss']);
});

// Default task (recompile on init before watching)
gulp.task('default', ['scss', 'watch']);
