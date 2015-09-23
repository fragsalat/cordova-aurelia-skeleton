var gulp = require('gulp');
var bundler = require('aurelia-bundler');
var vinylPaths = require('vinyl-paths');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var del = require('del');
var paths = require('../paths');

var config = {
  force: true,
  packagePath: paths.output,
  bundles: {
    "app-build": {
      includes: [
        'js/**/*',
        'js/**/*.html!text'
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "aurelia": {
      includes: [
        'aurelia-bootstrapper',
        'github:aurelia/templating-binding',
        'github:aurelia/templating-resources',
        'github:aurelia/templating-router',
        'github:aurelia/loader-default',
        'github:aurelia/history-browser',
        'github:aurelia/logging-console'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

gulp.task('copy-package', function() {
  return gulp.src('package.json')
             .pipe(replace(/"baseURL":\s*".*?"/, '"baseURL": "."'))
             .pipe(gulp.dest(paths.output))
});

gulp.task('remove-package', function() {
  return gulp.src(paths.output + 'package.json')
             .pipe(vinylPaths(del));
});

gulp.task('clean-output', function() {
  return gulp.src([
    paths.output + 'js',
    paths.output + 'jspm_packages/*',
    '!**/aurelia.js',
    '!**/app-build.js',
    '!**/jspm_packages/system*.js'
  ]).pipe(vinylPaths(del));
});

gulp.task('run-bundler', function() {
  return bundler.bundle(config);
});

gulp.task('run-unbundler', function() {
  return bundler.unbundle(config);
});

gulp.task('bundle', function() {
  return runSequence(
    'build',
    'copy-package',
    'run-bundler',
    'remove-package',
    'clean-output'
  );
});

gulp.task('unbundle', function() {
  return runSequence(
      'copy-package',
      'run-unbundler',
      'remove-package'
  );
});

