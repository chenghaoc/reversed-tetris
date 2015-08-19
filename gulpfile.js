var gulp = require('gulp')
var uglify = require('gulp-uglify');
var selector = require('gulp-selectors');
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
