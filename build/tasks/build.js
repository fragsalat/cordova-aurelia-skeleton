var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions('systemjs'))))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/src'}))
    .pipe(gulp.dest(paths.jsOutput));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.jsOutput));
});

// copies changed css files to the output directory
gulp.task('build-css', function() {
  return gulp.src(paths.style)
    .pipe(changed(paths.output, {extension: '.scss'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/src/style'}))
    .pipe(gulp.dest(paths.styleOutput))
    .pipe(browserSync.stream());
});

gulp.task('copy-resources', function() {
  gulp.src(paths.root + '../config.js').pipe(gulp.dest(paths.output));
  gulp.src('node_modules/materialize-css/fonts/roboto/*').pipe(gulp.dest(paths.output + 'style/font'));
  gulp.src(paths.root + '../index.html').pipe(gulp.dest(paths.output));
  return gulp.src(paths.root + '../jspm_packages/**/*').pipe(gulp.dest(paths.output + 'jspm_packages'));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-css', 'copy-resources'],
    callback
  );
});
