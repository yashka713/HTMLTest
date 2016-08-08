/**
 * Created by Ярик on 09.05.2016.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');

gulp.task('minify', function(){

// Конкатенация и минификация файлов
gulp.src(['src/js/script.js'])
    .pipe(concat('production.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));

gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'));

});
/*отслеживание изменений*/
gulp.task('change', function(){
    /*sass to css*/
    gulp.src('src/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css/'));
    /*css minification*/
    gulp.src('build/css/main.css')
        .pipe(concatCss("production.css"))
        .pipe(cssmin())
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css/'));
});
// Действия по умолчанию
gulp.task('default', function(){
    gulp.run('minify', 'change');

//Отслеживаем изменения в файлах
    gulp.watch(['src/css/**/*.scss', 'build/css/main.css'], function(event){
        gulp.run('change');
    });
});
