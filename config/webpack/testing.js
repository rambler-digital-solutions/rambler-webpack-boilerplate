'use strict';

// Depends
const path = require('path');
const webpack = require('webpack');

module.exports = function(_path) {
  return {
    cache: true,
    devtool: 'inline-source-map',
    entry: {},
    output: {
      path: path.join(_path, 'testing'),
      filename: '[name].js',
      chunkFilename: '[id].bundle.[chunkhash].js',
      publicPath: '/'
    },

    // resolves modules
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['node_modules'],
      alias: {
        _svg: path.join(_path, 'app', 'assets', 'svg'),
        _fonts: path.join(_path, 'app', 'assets', 'fonts'),
        _modules: path.join(_path, 'app', 'modules'),
        _images: path.join(_path, 'app', 'assets', 'images'),
        _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets'),
        _templates: path.join(_path, 'app', 'assets', 'templates')
      }
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /.spec\.js$/,
          include: path.join(_path, 'app'),
          exclude: /(bower_components|node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
              cacheDirectory: true
            }
          }
        },
        // es6 loader
        {
          test: /\.js$/,
          include: path.join(_path, 'app'),
          exclude: /(node_modules|__tests__)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
              cacheDirectory: true
            }
          }
        },
        // pug templates
        {
          test: /\.pug$/,
          use: {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        },
        // styles loader
        {
          test: /\.styl$/,
          use: [
            'style-loader',
            'css-loader',
            'stylus-loader']
        },
        // external files loader
        {
          test: /\.(png|ico|jpg|jpeg|gif|svg|ttf|eot|woff|woff2|swf|st)$/i,
          use: {
            loader: 'file-loader',
            options: {
              context: path.join(_path, 'app', 'assets'),
              name: '[path][hash].[name].[ext]'
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: '[name].js',
        children: true,
        minChunks: module => /node_modules/.test(module.resource) && !/.css/.test(module.resource)
      })
    ]
  };
};
