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

gulp.task('minify', function(){

// Конкатенация и минификация файлов
//gulp.src(['src/js/script.js'])
//    .pipe(concat('production.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('build/js/'));

//gulp.src('src/img/**/*')
//    .pipe(imagemin())
//    .pipe(gulp.dest('build/img/'));

gulp.src('src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css/'));

gulp.src('build/css/*.css')
    .pipe(concatCss("css/production.css"))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css/'));
});

// Действия по умолчанию
gulp.task('default', function(){
    gulp.run('minify');

//Отслеживаем изменения в файлах
    gulp.watch(['src/css/**/*.scss'], function(event){
        gulp.run('minify');
    });
});
