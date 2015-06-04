'use strict';

/**
 * Production config
 * @param  {String} _path Absolute path to application
 * @return {Object}       Object of proruction settings
 */
module.exports = function(_path) {
  return {
    context: _path,
    debug: false,
    devtool: 'cheap-source-map',
    output: {
      publicPath: '/rambler-webpack-boilerplate/'
    }
  }
}
