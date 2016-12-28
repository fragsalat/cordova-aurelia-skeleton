var appRoot = 'src/app/';
var outputRoot = 'www/';
var exportSrvRoot = 'export/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  style: appRoot + '../styles/**/*.scss',
  output: outputRoot,
  jsOutput: outputRoot + 'app',
  styleOutput: outputRoot + 'style',
  exportSrv: exportSrvRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
