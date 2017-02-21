var gulp       = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap       = require('gulp-wrap');
var declare    = require('gulp-declare');
var concat     = require('gulp-concat');
var sass       = require('gulp-sass');
var minify     = require('gulp-minify');
var minifyCss  = require('gulp-minify-css');

gulp.task('templates', function(){
    gulp.src('js/templates/*.html')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('public/templates'));
});

gulp.task('sass', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('watch:sass', function () {
    gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('pack-js', function () {
    return gulp.src('js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('pack-css', function () {
    return gulp.src('css/style.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('css'));
});

gulp.task('public', ['pack-js', 'pack-css']);