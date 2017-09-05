'use strict';

// Depends
const path         = require('path');
const webpack      = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const TextPlugin   = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlPlugin   = require('html-webpack-plugin');

/**
 * Global webpack config
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
module.exports = function(_path) {
  const rootAssetPath = path.join(_path, 'app');

  // return objecy
  return {
    // entry points
    entry: {
      application: path.join(_path, 'app', 'app.js')
    },

    // output system
    output: {
      path: path.join(_path, 'dist'),
      filename: path.join('assets', 'js', '[name].[hash].js'),
      chunkFilename: '[id].bundle.[chunkhash].js',
      publicPath: '/'
    },

    // resolves modules
    resolve: {
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

    // modules resolvers
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: 'pug-loader'
        },
        {
          test: /\.styl$/,
          use: TextPlugin.extract([
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                context: rootAssetPath,
                sourceMap: true,
                plugins: loader => [
                  autoprefixer({
                    remove: false,
                    browsers: ['last 5 versions']
                  })
                ]
              }
            },
            'stylus-loader'
          ])
        },
        {
          test: /\.(css|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
          use: {
            loader: 'file-loader',
            options: {
              context: rootAssetPath,
              name: path.join('assets','static', '[ext]', '[name].[hash].[ext]')
            }
          }
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          },
          exclude: /(node_modules|bower_components)/
        }
      ]
    },

    // load plugins
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: path.join('assets', 'js', '[name].[hash].js'),
        chunks: ['application'],
        minChunks: module => /node_modules/.test(module.resource) && !/.css/.test(module.resource)
      }),

      new TextPlugin('assets/css/[name].[chunkhash].css'),

      new AssetsPlugin({
        path: path.join(_path, 'config'),
        filename: 'manifest.json',
        prettyPrint: true
      }),

      // create instance for entrypoint index.html building
      new HtmlPlugin({
        title: 'Rambler Webpack Dev Boilerplate',
        chunks: ['application', 'vendors'],
        filename: 'index.html',
        template: path.join(_path, 'app', 'assets', 'templates', 'layouts', 'index.html')
      })
    ]
  };
};
