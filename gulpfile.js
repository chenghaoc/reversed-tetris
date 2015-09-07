var gulp = require('gulp')
var uglify = require('gulp-uglify');
var selector = require('gulp-selectors');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uncss = require('gulp-uncss');
gulp.task('compress', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/src/js'));
});


gulp.task('minify', function() {
  return gulp.src(['src/css/*.css', 'index.html'])
    .pipe(selector.run({
      'css': ['css'],
      'html': ['html'],
      'js-strings': ['js']
    }, {
      classes: [
        'sidebar__element__next__block*',
        'container__block*',
        'container__row',
        'container',
        'slow-transible',
        'display-none'
      ],
      ids: '*'
    }))
    .pipe(gulp.dest('dist/src'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare: true
  };

  return gulp.src('./dist/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist'));
});

var minifyCss = require('gulp-minify-css');

gulp.task('minify-css', function() {
  return gulp.src('dist/src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/src'));
});
