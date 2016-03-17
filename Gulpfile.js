// Set dependencies
var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;

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

/*
  STARTS SELF QA ENVIRONMENT
  Listens for changes on JS file, and reboots server
 */
gulp.task('default', function() {
  gulp.run('app');
  gulp.watch(['app.js', './node_modules/**/*.js'], function() {
    gulp.run('app');
  });

  // TO DO - Add Sass Watch to this VERY FILE, right here. All smooth like.
});

process.on('exit', function() {
  if (node) node.kill()
});
