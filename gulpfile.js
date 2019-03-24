var {series, src, dest} = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css');

var paths = {
    css: './*.css',
    dest: './public'
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


exports.build = series(toPrefix, compress);