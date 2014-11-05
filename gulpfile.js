var gulp = require('gulp'),
    config = require('./config'),
    nodemon = require('gulp-nodemon');
    gutil = require('gulp-util'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

gulp.task('browserify', function() {
  gulp.src([ config.clientSrc + '/src/js/app.js'])
  .pipe(browserify({
    shim: {
      angular: {
        path: config.clientSrc + '/bower_components/angular/angular.min.js',
        exports: 'angular'
      },
      uiRouter: {
        path: config.clientSrc + '/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        exports: 'uiRouter'
      }
    }
  }).on('error', gutil.log))
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest( config.clientSrc + './dist/js'))
});

gulp.task('sass', function() {
  gulp.src( config.clientSrc + '/src/scss/**/*.scss')
  .pipe(sass({style: 'compressed' }).on('error', gutil.log))
  .pipe(gulp.dest( config.clientSrc + '/dist/css/'))
});

gulp.task('mv-html', function() {
  gulp.src( config.clientSrc + '/src/**/*.html')
  .pipe(gulp.dest( config.clientSrc + '/dist/'));
});

// livereload browser on client app changes
gulp.task('livereload', ['serve'], function(){
  console.log('hi');
  var server = livereload();
  return gulp.watch('./client/dist/**', function(evt){
    console.log('hi');
    server.changed(evt.path);
  });
});

gulp.task('watch', function() {
  gulp.watch([ config.clientSrc + '/src/**/*.js'], [
    'browserify'
  ]);
  gulp.watch([ config.clientSrc + '/src/**/*.scss'], [
    'sass'
  ]);
  gulp.watch([ config.clientSrc + '/src/**/*.html'], [
    'mv-html'
  ]);
  livereload.listen();
  gulp.watch('./client/dist/**').on('change', livereload.changed);
});

//run app using nodemon
gulp.task('serve', ['dist'], function(){
  return nodemon({
    script: 'server.js', options: '-i' + config.clientSrc
  });
});

gulp.task('dist', ['sass', 'mv-html', 'browserify'], function() {
  console.log( "Dist built @ " + new Date());
});

gulp.task('default', ['watch', 'serve', 'livereload'], function() {
  console.log("Running @ http://localhost:" + config.port);
});
