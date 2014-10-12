var gulp = require('gulp'),
    config = require('./config'),
    nodemon = require('gulp-nodemon');
    gutil = require('gulp-util'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

function notifyLiveReload(event) {
  var fileName = path.relative(__dirname + config.clientDirectory + '/src/', event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('browserify', function() {
  gulp.src([ config.clientDirectory + '/src/js/app.js'])
  .pipe(browserify({
    shim: {
      angular: {
        path: config.clientDirectory + '/bower_components/angular/angular.min.js',
        exports: 'angular'
      },
      uiRouter: {
        path: config.clientDirectory + '/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        exports: 'uiRouter'
      }
    }
  }).on('error', gutil.log))
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest( config.clientDirectory + './dist/js'))
});

gulp.task('sass', function() {
  gulp.src( config.clientDirectory + '/src/scss/**/*.scss')
  .pipe(sass({style: 'compressed' }).on('error', gutil.log))
  .pipe(gulp.dest( config.clientDirectory + '/dist/css/'))
});

gulp.task('mv-html', function() {
  console.log('Holler');
  gulp.src( config.clientDirectory + '/src/index.html')
  .pipe(gulp.dest( config.clientDirectory + '/dist/'));
});

gulp.task('livereload', function() {
  tinylr.listen( config.lrport );
});

gulp.task('watch', function() {
  gulp.watch([ config.clientDirecotry + '/src/**/*.js'], [
    'browserify'
  ]);
  gulp.watch([ config.clientDirectory + '/src/**/*.scss'], [
    'sass'
  ]);
  gulp.watch([ config.clientDirectory + '/src/*.html'], [
    'mv-html'
  ]);
  gulp.watch('./dist/**').on('change', notifyLiveReload);
});

gulp.task('runserver', function () {
  nodemon({ 
    script: 'server.js',
    ignore: [ config.clientDirectory ]
  })
})

gulp.task('dist', ['sass', 'mv-html', 'browserify'], function() {
  console.log( "Dist built @ " + new Date());
});

gulp.task('default', ['watch', 'runserver'], function() {
  console.log("Running @ http://localhost:" + config.port);
});
