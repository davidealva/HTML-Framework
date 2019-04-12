let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let server = require('gulp-webserver');

gulp.task('server', function() {
  gulp.src('app')	// <-- your app folder
    .pipe(server({
      livereload: true,
      open: true,
      port: 3000	// set a port to avoid conflicts with other local apps
    }));
});

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('minify-css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('run', ['sass', 'minify-css']);

gulp.task('watch', function(){
  gulp.watch('app/sass/*.scss', ['sass']);
  gulp.watch('app/css/*.css', ['minify-css']);
});

gulp.task('default', ['server', 'run', 'watch']);
