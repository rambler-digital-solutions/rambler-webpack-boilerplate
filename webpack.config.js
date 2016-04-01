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
  development: require(__dirname + '/config/webpack/environments/development')
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

  return _.merge(
    _configs[ENV](__dirname),
    _configs.global(__dirname)
  );
};

/**
 * Export WebPack config
 * @type {[type]}
 */
module.exports = _load();
