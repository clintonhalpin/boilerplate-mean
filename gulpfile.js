var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('runapi', function () {
  nodemon({ 
    script: 'server.js',
  })
})

gulp.task('default', ['runapi'], function() {})
