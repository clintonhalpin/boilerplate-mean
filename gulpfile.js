var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('runapi', function () {
  nodemon({ 
    script: 'api/server.js',
  })
})

gulp.task('default', ['runapi'], function() {})
