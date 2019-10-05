var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserslist= require('browserslist');
var autoprefixer= require('gulp-autoprefixer');
var pug         = require('gulp-pug');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require("gulp-rename");
var imagemin    = require('gulp-imagemin');
var plumber     = require('gulp-plumber');
var replace     = require('gulp-replace');
var browserSync = require('browser-sync').create();

sass.compiler   = require('node-sass');
  
function style(){
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        './source/sass/*.scss'
    ])
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
}

function templates(){
    return gulp.src('./source/layouts/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
}

function images() {
    return gulp
        .src('source/images/*')
        .pipe(
        imagemin()
    )
    .pipe(gulp.dest('dist/img'));
}

function javascript(){
    return gulp.src([
        './source/javascript/javascript.js'
    ])
        .pipe(uglify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream())
}
function plugins(){
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        './source/javascript/plugins/*.js'
    ])
        .pipe(concat('plugins.js') )
        .pipe(uglify({
        compress:{
            drop_console:true
        }
    }))
        .pipe(gulp.dest('dist/js/plugins'))
        .pipe(browserSync.stream())
}
// function fontsAwesome(){
//     return gulp.src([
//         'node_modules/font-awesome/css/font-awesome.css'
//     ])
//         .pipe(gulp.dest('./dist/css'));
// }
function fonts(){
    return gulp.src([
        'node_modules/font-awesome/fonts/*'
    ])
        .pipe(gulp.dest('./dist/fonts'));
}

function fontsAwesome(){
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('./dist/webfonts/'));
}
function watchFiles() {
    gulp.watch('node_modules/bootstrap/scss/bootstrap.scss', style);
    gulp.watch('source/sass/**/*.scss', style);
    gulp.watch('source/layouts/**/*.pug', templates);
    gulp.watch('source/images/*', images);
    gulp.watch('source/javascript/**/*.js', javascript);
    gulp.watch('source/javascript/plugins/*.js', plugins);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
}

function browser(){
    browserSync.init({
        server: './dist/'
    })
}

const watch = gulp.series(style, templates, images, javascript, plugins, fontsAwesome, gulp.parallel(watchFiles, browser));
exports.default = watch;