/*global process, __dirname */

var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');

// Include plugins
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = path.join(__dirname, '/public/');
// Build public library
gulp.task('bower', function() {
  return gulp.src(plugins.mainBowerFiles(), {
      base: 'bower_components'
    })
    .pipe(gulp.dest('public/lib'));
});

// Build out all of our bower javascript files
gulp.task('bower:js', function() {
	var jsFiles = ['src/js/*'];
	return gulp.src(plugins.mainBowerFiles().concat(jsFiles))
		.pipe(plugins.filter('*.js'))
		.pipe(gulp.dest(dest + 'js'));     
});

// Compile all css files
gulp.task('bower:css', ['bootstrap:compileLess', 'site:compileLess', 'font-awesome:compileLess'], function() {
    var cssFiles = ['src/css/*'];
	return gulp.src(plugins.mainBowerFiles().concat(cssFiles))
		.pipe(plugins.filter('*.css'));
    
});

// Compile all font files
gulp.task('bower:fonts', ['bootstrap:fonts', 'font-awesome:fonts']);

// Build out bootstrap using our custom variables file
gulp.task('bootstrap:prepareLess', ['bower'], function() {
  return gulp.src('less/bootstrap/variables.less')
    .pipe(gulp.dest('public/lib/bootstrap/less'));
    
});

gulp.task('bootstrap:fonts', function(){
    return gulp.src('public/lib/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('public/fonts'));
});
gulp.task('font-awesome:fonts', function(){
    return gulp.src('public/lib/font-awesome/fonts/**')
    .pipe(gulp.dest('public/fonts'));
});

// Compile bootstrap less files to css
gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function() {
  return gulp.src('public/lib/bootstrap/less/bootstrap.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

// Build out font-awesome using our custom variables file
gulp.task('font-awesome:prepareLess', ['bower'], function() {
  return gulp.src('less/font-awesome/variables.less')
    .pipe(gulp.dest('public/lib/font-awesome/less'));
    
});

// Compile font-awesome less files to css
gulp.task('font-awesome:compileLess', ['font-awesome:prepareLess'], function() {
  return gulp.src('public/lib/font-awesome/less/font-awesome.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});


// Compile site less file to css file
gulp.task('site:compileLess', function(){
    return gulp.src('less/site.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});






// Watch tasks
gulp.task('watch', ['bootstrap:watch', 'site:watch', 'font-awesome:watch']);

gulp.task('bootstrap:watch', function() {
  gulp.watch(['less/bootstrap/variables.less'], 
      ['bootstrap:compileLess']);
});

gulp.task('font-awesome:watch', function() {
  gulp.watch(['less/font-awesome/variables.less'], 
      ['font-awesome:compileLess']);
});

gulp.task('site:watch', function() {
  gulp.watch(['less/site.less'], 
      ['site:compileLess']);
});



gulp.task('default', ['bower:css', 'bower:js', 'bower:fonts']);