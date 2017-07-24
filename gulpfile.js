var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();


//tasks

gulp.task('default', ['browserSync', 'sassTask', 'libTask', 'concat', 'lib'], function(){
  gulp.watch('dev/styles/**/*.scss', ['sassTask']);
  gulp.watch('dev/**.html', ['libTask']);
});


gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir : 'app'
    }
  });
});

gulp.task('sassTask', function(){
  return gulp.src('dev/styles/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/styles'))
});

gulp.task('libTask', function(){
  return gulp.src('dev/*.html')
  .pipe(gulp.dest('app'))
});

gulp.task('concat', function(){
  return gulp.src('dev/scripts/*.js')
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('app/scripts'))
  .pipe(uglify())
  .pipe(gulp.dest('app/scripts'))
});

gulp.task('lib', function(){
  return gulp.src('dev/scripts/lib/*.js')
  .pipe(gulp.dest('app/scripts/lib'))
  .pipe(uglify())
  .pipe(gulp.dest('app/scripts/lib'))
});
