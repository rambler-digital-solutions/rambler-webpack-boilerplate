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

//Depends
var _ = require('lodash');

/**
 * [config description]
 * @type {Object}
 */
var _configs = {

  //global section
  global: require(__dirname + '/config/webpack/global'),

  //config by enviroments
  production: require(__dirname + '/config/webpack/environments/production'),
  development: require(__dirname + '/config/webpack/environments/development')
};

/**
 * Load webpack config via enviroments
 * @param  {[type]} enviroment [description]
 * @return {[type]}            [description]
 */
var _load = function(enviroment) {

  //check enviroment
  if (!enviroment) throw 'Can\'t find local enviroment variable via process.env.NODE_ENV';
  if (!_configs[enviroment]) throw 'Can\'t find enviroments see _congigs object';

  //load config file by enviroment
  return _configs && _.merge(
    _configs['global'](__dirname),
    _configs[enviroment](__dirname)
  );
}

/**
 * Export WebPack config
 * @type {[type]}
 */
module.exports = _load(process.env.NODE_ENV);
