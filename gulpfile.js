const gulp = require('gulp'),
      sass = require('gulp-sass'),
      path = require('path');

gulp.task('sass',function(){
    return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
})
gulp.watch('sass:watch', function(){
    return gulp.watch('./sass/**/*.scss', ['sass'])
});

gulp.task('default', ['sass']);