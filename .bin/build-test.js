'use strict';

// Depends
var port = 8081;
var host = 'localhost';
var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var Testem = require('./testem');
var WebpackDevServer = require('webpack-dev-server');
var pkg = require('../package.json');
var config = require('../config/webpack/testing')(path.join(__dirname, '..'));
var dependencies  = Object.keys(pkg.dependencies);

/**
 * Create webpack instance
 * @param  {object} endConfig Endpoint config
 * @return webpack
 */
var createCompiller = function(endConfig) {
  // create webpack compiller
  return webpack(endConfig, function() {});
};

/**
 * Start Testem framework
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
var startTestem = function(stat) {
  var options = {
    framework: 'mocha',
    launch_in_dev: [
      'phantomjs'
    ],
    serve_files: stat.compilation.chunks.map(value => {
      return `http://${host}:${port}/${value.files[0]}`;
    })
  };

  var Instance = new Testem;
  Instance.start(options, function() {
    console.log('╭∩╮（︶︿︶）╭∩╮: Ctrl + C -> For EXIT');
  });

  return Instance;
};

/**
 * Webpack dev-server start
 * @return {[type]} [description]
 */
var startServer = function(endConfig) {
  var testemInstance = false;
  var compiler = webpack(endConfig);

  compiler.plugin('done', stat => {
    !testemInstance && typeof testemInstance === 'boolean'
      ? testemInstance = startTestem(stat)
      : testemInstance.restart();
  });

  return new WebpackDevServer(compiler, {
    noInfo: true
  }).listen(port, host);
};

glob('app/**/__tests__/*.spec.js', function(err, files) {
  Object.keys(pkg.devDependencies).indexOf('chai') > 0
    ? dependencies.push('chai')
    : null;

  // add dependencies to vendors chunk
  config.entry = {
    a: dependencies,
  };

  // all spec's file gone to one of entry point
  files.forEach(function(file) {
    config.entry[path.basename(file, '.js')] = path.join(__dirname, '..', file);
  });

  // vendors
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin('a', 'a.js'));

  // check NODE_ENV
  process && process.env && process.env.NODE_ENV === 'tdd'
    ? startServer(config)
    : createCompiller(config);
});
