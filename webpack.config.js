'use strict';

/**
 * Webpack Development Boilerplate
 * Include:
 *  - stylus
 *  - pug
 *  - modular components
 *  - chunkhashing
 *  - autoprefixier
 *  - separated ENV
 *  - build system
 *  - etc...
 *  @author Mike Chernobrov
 *  @see    http://rambler-co.ru
 */

/**
 * Exported evnironments object
 * @type {Object}
 */
const _configs = {

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
const _load = function() {
  var ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : 'production';

  return mergeDeep(
    _configs[ENV](__dirname),
    _configs.global(__dirname)
  );
};

/**
 * Simple is object check.
 * @param  {Object} item
 * @return {boolean}
 */
const isObject = item => {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
};

/**
 * Deep merge two objects.
 * @param  {object} target [description]
 * @param  {object} source [description]
 * @return {object}        [description]
 */
const mergeDeep = (target, source) => {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return target;
};

/**
 * Export WebPack config
 * @type {[type]}
 */
module.exports = _load();
