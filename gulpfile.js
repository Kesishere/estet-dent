var {watch, parallel, series, src, dest} = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css');
var browsersync = require("browser-sync").create();

var port = 3000;
var paths = {
    css: './*.css',
    dest: './public'
}

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./src/"
        },
        port
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}
  
function toCss() {
    return src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(paths.dest));
}

function toPrefix() {
    return src(paths.css)
        .pipe(postcss([ autoprefixer() ]))
        .pipe(dest(paths.dest));
} 

function compress() {
    return src(paths.css)
        .pipe(cleanCSS())
        .pipe(dest(paths.dest));
}

function watchFiles() {
    watch(["./**/*"], browserSyncReload);
}

exports.watch = parallel(watchFiles, browserSync);
exports.build = series(toPrefix, compress);