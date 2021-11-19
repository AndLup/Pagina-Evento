const { series, src, dest, watch, paralell } = require('gulp');

const sass = require('gulp-sass')(require('sass'));

const imagemin = require('gulp-imagemin');

const notify = require('gulp-notify');

const webp = require('gulp-webp');

const concat = require('gulp-concat');

//Utilidades CSS

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps')
const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

//Utilidades JS
const terser = require('gulp-terser-js')
const rename = require('gulp-rename')

//FUNCION QUE COMPILA SASS

function css( ){
  return src(paths.scss)
    .pipe( sourcemaps.init() )
    .pipe( sass())
    .pipe( postcss ([autoprefixer(), cssnano()]))
    .pipe( sourcemaps.write('.'))
    .pipe( dest('./build/css'))
    
}

function minificarcss(){
    return src(paths.scss)
    .pipe( sass({
            outputStyle: 'compressed'
    }))
    .pipe( dest('./build/css'))
}

function javascript(){
    return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe( concat ('bundle.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: '.min'}))
    .pipe (dest ('./build/js'))
}

function imagenes(){
    return src(paths.imagenes)
    .pipe(imagemin())
    .pipe(dest('.build/img'))
    .pipe( notify ({message: 'Imagen Minificada'}));
}

function versionWebp(){
    return src(paths.imagenes)
    .pipe( webp())
    .pipe(dest('.build/img'))
    .pipe( notify ({message: 'Version webp Lista'}));
}

function watchArchivos(){
    watch(paths.scss, css);
    watch(paths.js, javascript)
}


exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.watchArchivos = watchArchivos;

exports.default = series (css, javascript, imagenes, versionWebp, watchArchivos)