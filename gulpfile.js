// Include Gulp
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

// Build out our custom variables file
gulp.task('bootstrap:prepareLess', ['bower'], function() {
  return gulp.src('less/bootstrap/variables.less')
    .pipe(gulp.dest('public/lib/bootstrap/less'));
    
});
// Compile all bootstrap less files to a single bootstrap.css file
gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function() {
  return gulp.src('public/lib/bootstrap/less/bootstrap.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

// Compile site less to css file
gulp.task('site:compileLess', function(){
    return gulp.src('less/site.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

// Compile all css files
gulp.task('bower:css', ['bootstrap:compileLess', 'site:compileLess'], function() {
    var cssFiles = ['src/css/*'];
	return gulp.src(plugins.mainBowerFiles().concat(cssFiles))
		.pipe(plugins.filter('*.css'));
    
});
gulp.task('default', ['bower:css', 'bower:js']);