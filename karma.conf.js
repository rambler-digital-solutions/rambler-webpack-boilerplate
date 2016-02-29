// Depends
var webpackConfig = require('./config/webpack/environments/testing')(__dirname);

module.exports = function(config) {
  config.set({
    coverageReporter: {
      dir: 'tmp/coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    files: [
      'app/**/*.spec.js'
    ],
    frameworks: [
      'chai',
      'jasmine'
    ],
    preprocessors: {
      'app/**/*.spec.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    plugins: [
      'karma-jasmine',
      'karma-mocha',
      'karma-chai',
      'karma-coverage',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-sourcemap-loader'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
