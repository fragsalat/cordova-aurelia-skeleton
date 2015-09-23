var path = require('path');

var appRoot = 'src/';
var outputRoot = 'www/';

module.exports = {
  root: appRoot,
  source: [appRoot + '**/*.js', '!**/jspm_packages/**', '!**/config.js'],
  html: [appRoot + '**/*.html', '!**/jspm_packages/**'],
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,
  doc:'./doc'
};
