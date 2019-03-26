/// <binding BeforeBuild='copylibs' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/
var libjs = ["./node_modules/jquery/dist/jquery.min.js"];

var libcss = ["./node_modules/bootstrap/dist/css/bootstrap.min.css"];
  
var libdirs = [];

var libcssdirs = [];

var lib = [];

var paths = {
  webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.sass = paths.webroot + 'css/*.scss';
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.tsWebRoot = paths.webroot + "ts/";

var gulp = require('gulp');
var addsrc = require("gulp-add-src");

gulp.task("copylibs:js", function (cb) {
  return gulp.src(libjs)
    .pipe(gulp.dest(paths.webroot + "lib/js"));
});

gulp.task("copylibs:css", function (cb) {
  var p = gulp.src(libcss);
  for (var i = 0; i < libcssdirs.length; i++) {
    var dir = libcssdirs[i];
    p = p.pipe(addsrc(dir[0], { base: dir[1] }));
  }
  return p.pipe(gulp.dest(paths.webroot + "lib/css"));
});

gulp.task("copylibs:lib", function (cb) {
  var p = gulp.src(lib);
  for (var i = 0; i < libdirs.length; i++) {
    var dir = libdirs[i];
    p = p.pipe(addsrc(dir[0], { base: dir[1] }));
  }
  return p.pipe(gulp.dest(paths.webroot + "lib"));
});

gulp.task("copylibs", ["copylibs:js", "copylibs:css", "copylibs:lib"]);

gulp.task('default', ['copylibs']);