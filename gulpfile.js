var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var concatCss = require('gulp-concat-css');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var webserver = require('gulp-webserver');
var appConfig = require('./config.json');

var path = {
    HTML: ['./index.html'],
    CSS: './src/**/*.css',
    FONTS: ['./src/lib/fonts/**.*'],
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST_BUILD: 'dist/build',
    DEST_LOCAL: 'dist/local/',
    ENTRY_POINT: './index.web.js'
};

gulp.task('copyReplaceBuild', function() {
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('html', function() {
    return gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST_LOCAL));
});

gulp.task('css', function() {
    return gulp.src(path.CSS)
        .pipe(concatCss("css/build.css", { rebaseUrls: false }))
        .pipe(gulp.dest(path.DEST_LOCAL));
});

gulp.task('icons', function() {
    return gulp.src(path.FONTS)
        .pipe(gulp.dest(path.DEST_LOCAL + 'fonts/'));
});

gulp.task('watch', function() {
    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [
            ['reactify', {'harmony': true}]
        ],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function (changedFile) {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_LOCAL));
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_LOCAL));
});

gulp.task('build', function() {
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [
            ['reactify', {'harmony': true}]
        ]
    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('server', function() {
    gulp.src(path.DEST_LOCAL)
        .pipe(webserver({
            livereload: true,
            host: appConfig.webServer.host,
            port: appConfig.webServer.port,
            open: true,
            proxies: [{source: appConfig.webServer.proxySource, target: appConfig.webServer.proxyTarget}]
        }))
        .pipe(webserver({
            livereload: true,
            host: 'localhost',
            port: appConfig.webServer.port,
            open: true,
            proxies: [{source: appConfig.webServer.proxySource, target: appConfig.webServer.proxyTarget}]
        }));
});

gulp.task('production', ['copyReplaceBuild', 'build']);
gulp.task('default', ['html', 'css', 'icons', 'watch', 'server']);