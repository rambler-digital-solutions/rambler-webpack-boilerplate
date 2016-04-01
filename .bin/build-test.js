'use strict';

// Depends
var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var pkg = require('../package.json');
var config = require('../config/webpack/testing')(path.join(__dirname, '..'));
var dependencies  = Object.keys(pkg.dependencies);

glob('app/**/__tests__/*.spec.js', function(err, files) {
  config.entry = {
    vendors: dependencies
  };
  files.forEach(function(file) {
    config.entry[path.basename(file, '.spec.js')] = path.join(__dirname, '..', file);
  });

  webpack(config, function() {});
});
