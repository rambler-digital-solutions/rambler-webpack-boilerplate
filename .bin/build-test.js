'use strict';

// Depends
const port = 8081;
const host = 'localhost';
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const Testem = require('./testem');
const WebpackDevServer = require('webpack-dev-server');
const pkg = require('../package.json');
const config = require('../config/webpack/testing')(path.join(__dirname, '..'));

/**
 * Create webpack instance
 * @param  {object} endConfig Endpoint config
 * @return webpack
 */
const createCompiller = function(endConfig) {
  // create webpack compiller
  return webpack(endConfig, function() {});
};

/**
 * Start Testem framework
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
const startTestem = function(stat) {
  const options = {
    framework: 'mocha',
    launch_in_dev: [
      'phantomjs'
    ],
    serve_files: stat.compilation.chunks.map(value => {
      return `http://${host}:${port}/${value.files[0]}`;
    })
  };

  const Instance = new Testem;
  Instance.start(options, function() {
    console.log('╭∩╮（︶︿︶）╭∩╮: Ctrl + C -> For EXIT');
  });

  return Instance;
};

/**
 * Webpack dev-server start
 * @return {[type]} [description]
 */
const startServer = function(endConfig) {
  const compiler = webpack(endConfig);
  let testemInstance = false;

  compiler.plugin('done', stat => {
    !testemInstance && typeof testemInstance === 'boolean'
      ? testemInstance = startTestem(stat)
      : testemInstance.restart();
  });

  return new WebpackDevServer(compiler, {
    noInfo: true
  }).listen(port, host);
};

glob('app/**/__tests__/*.spec.js', (err, files) => {
  // all spec's file gone to one of entry point
  files.forEach(file => {
    config.entry[path.basename(file, '.js')] = path.join(__dirname, '..', file);
  });

  // check NODE_ENV
  process && process.env && process.env.NODE_ENV === 'tdd'
    ? startServer(config)
    : createCompiller(config);
});
