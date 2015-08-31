var gulp = require('gulp')
var uglify = require('gulp-uglify');
var selector = require('gulp-selectors');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
gulp.task('compress', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});


gulp.task('minify', function() {
  return gulp.src(['src/css/*.css', 'index.html'])
    .pipe(selector.run())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('./dist/index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/html/'));
});

var minifyCss = require('gulp-minify-css');

gulp.task('minify-css', function() {
  return gulp.src('dist/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/'));
});
