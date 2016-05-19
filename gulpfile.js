const gulp = require('gulp'),
      sass = require('gulp-sass'),
      path = require('path');

gulp.task('sass',function(){
    return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
})
gulp.task('angular',function(){
    gulp.src('./node_modules/angular/angular.min.js')
    .pipe(gulp.dest('./public/js'))
})

gulp.task('angular-mocks',function(){
    gulp.src('./node_modules/angular-mocks/angular-mocks.js')
    .pipe(gulp.dest('./public/js'))
})


gulp.task('default', ['sass', 'angular', 'angular-mocks'], function(){ return; });


gulp.task('sass:watch', function(){
    return gulp.watch('./sass/**/*.scss', ['sass'])
});
