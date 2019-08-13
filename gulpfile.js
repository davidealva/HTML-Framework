const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const server = require("gulp-webserver");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const twig = require("gulp-twig");
var gulpSequence = require('gulp-sequence')

gulp.task("server", () => {
  return gulp
    .src("dist") // <-- your app folder
    .pipe(
      server({
        livereload: true,
        open: true,
        port: 3000 // set a port to avoid conflicts with other local apps
      })
    );
});

sass.compiler = require("node-sass");

gulp.task("sass", () => {
  return gulp
    .src("app/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("app/css"));
});

gulp.task("image", () => {
  return gulp
    .src("app/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
});

gulp.task("css", () => {
  return gulp
    .src("app/css/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts", () => {
  return gulp
    .src("app/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

// Compile Twig templates to HTML
gulp.task("templates", () => {
  return gulp
    .src("app/*.html") // run the Twig template parser on all .html files in the "src" directory
    .pipe(twig())
    .pipe(gulp.dest("dist")); // output the rendered HTML files to the "dist" directory
});

gulp.task("html", () => {
  return gulp
    .src("dist/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("downloads", () => {
  return gulp
    .src("app/downloads/*.*")
    .pipe(gulp.dest("dist/downloads"));
});

// gulp.task("run", ["sass", "image", "css", "scripts", "html"]);
gulp.task("run", gulpSequence("sass", "image", "css", "scripts",["templates"], "html"));

gulp.task("build", gulpSequence("sass", "image", "css", "scripts", "downloads",["templates"], "html"));

gulp.task("watch", () => {
  gulp.watch("app/sass/*.scss", ["sass"]);
  gulp.watch("app/img/*.*", ["image"]);
  gulp.watch("app/css/*.css", ["css"]);
  gulp.watch("app/js/**/*.js", ["scripts"]);
  // gulp.watch("app/*.html", ["templates"]);
  // gulp.watch("app/partial/*.html", ["templates"]);
  gulp.watch("app/*.html", function (event) {
    gulpSequence(["templates"], "html")(function (err) {
      if (err) console.log(err)
    })
  });
  gulp.watch("app/partial/.html", function (event) {
    gulpSequence(["templates"], "html")(function (err) {
      if (err) console.log(err)
    })
  });
});

gulp.task("default", ["server", "run", "watch"]);
