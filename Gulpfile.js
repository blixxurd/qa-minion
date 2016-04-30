// Set dependencies
var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node,
    sass = require('gulp-sass'),
    onError = function(err) {
      console.log(err);
    };

/* Run the app. If it's already running, destroy it */
gulp.task('app', function() {
  if (node) { node.kill(); }
  node = spawn('node', ['app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

/* SCSS COMPILER */
gulp.task('styles', function() {
    gulp.src('web/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('web/css/'))
});

/*
  STARTS SELF QA ENVIRONMENT
  Listens for changes on JS file, and reboots server
*/
gulp.task('default', ['app'], function() {
  gulp.watch(['app.js', './node_modules/**/*.js', './inc/*.js'], ['app']);
  gulp.watch('web/css/**/*.scss', ['styles']);
});

process.on('exit', function() {
  if (node) node.kill()
});
