var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var webserver = require('gulp-webserver');
var appConfig = require('./config.json');

var path = {
  HTML: ['src/index.html', 'src/index.css'],
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/index.js'
};

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [
      [ 'reactify', {'harmony': true} ]
    ],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function (changedFile) {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
  })
  .bundle()
  .pipe(source(path.OUT))
  .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [
      [ 'reactify', {'harmony': true} ]
    ]
  })
  .bundle()
  .pipe(source(path.MINIFIED_OUT))
  .pipe(streamify(uglify(path.MINIFIED_OUT)))
  .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('server', function() {
  gulp.src(path.DEST)
    .pipe(webserver({
      livereload: true,
      port: appConfig.webServer.port,
      open: true,
      proxies: [{ source: appConfig.webServer.proxySource, target: appConfig.webServer.proxyTarget }]
    }));
});

gulp.task('production', ['replaceHTML', 'build']);
gulp.task('default', ['copy', 'watch', 'server']);