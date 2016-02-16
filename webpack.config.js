'use strict';

/**
 * Webpack Development Boilerplate
 * Include:
 *  - stylus
 *  - jade
 *  - modular components
 *  - chunkhashing
 *  - autoprefixier
 *  - separated ENV
 *  - SVG store && SVG min
 *  - build system
 *  - etc...
 *  @author Mike Chernobrov
 *  @see    http://rambler-co.ru
 */

// Depends
var _ = require('lodash');

/**
 * Exported evnironments object
 * @type {Object}
 */
var _configs = {

  // global section
  global: require(__dirname + '/config/webpack/global'),

  // config by enviroments
  production: require(__dirname + '/config/webpack/environments/production'),
  development: require(__dirname + '/config/webpack/environments/development'),
  testing: require(__dirname + '/config/webpack/environments/testing')
};

/**
 * Compilation error
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
var error = function(message) {
  throw new Error(message);
};


/**
 * Load webpack config via enviroments
 * @param  {[type]} enviroment [description]
 * @return {[type]}            [description]
 */
var _load = function() {
  var ENV = process.env.NODE_ENV 
    ? process.env.NODE_ENV
    : 'production';

  !_configs[ENV]
    ? error('Can\'t find enviroments. See _configs object')
    : null;

  // load config file by environment
  return _configs && _.merge(
    _configs.global(__dirname),
    _configs[ENV](__dirname)
  );
};

/**
 * Export WebPack config
 * @type {[type]}
 */
module.exports = _load();
