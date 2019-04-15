const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const server = require('gulp-webserver');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

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

gulp.task('image', () =>
	gulp.src('app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
);

gulp.task('css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('run', ['sass', 'image', 'css', 'scripts', 'html']);

gulp.task('watch', function(){
  gulp.watch('app/sass/*.scss', ['sass']);
  gulp.watch('app/img/*.*', ['image']);
  gulp.watch('app/css/*.css', ['css']);
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/*.html', ['html']);
});

gulp.task('default', ['server', 'run', 'watch']);
