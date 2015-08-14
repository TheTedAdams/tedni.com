var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');

gulp.task('default', function() {
  startServer();

  return gulp.src('src/scss/*.scss')
    .pipe(watch('src/scss/*.scss'))
    .pipe(sass({sourcemap: true, style: 'compact'}))
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'ie 7'))
    .pipe(gulp.dest('src/css'));
});

function startServer() {
  var express = require('express');
  var app = express();

  app.use(express.compress()); // gzip content
  app.use(express.static(__dirname + '/src')); // Cached for one day
  app.listen(process.env.PORT || 3417);
}