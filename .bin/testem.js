'use strict';

// Depends
var log = require('npmlog');
var App = require('testem/lib/app');
var Config = require('testem/lib/config');
var EventEmitter = require('events').EventEmitter;

/**
 * Testem API
 */
function Testem() {}

/**
 * Start testem application
 * @param  {[type]} options   [description]
 * @param  {[type]} finalizer [description]
 * @return {[type]}           [description]
 */
Testem.prototype.start = function(options, finalizer) {
  var fakeStream = new EventEmitter();
  fakeStream.write = function() {};
  log.stream = fakeStream;

  this.options = options || {};
  this.config = new Config('dev', this.options);
  this.app = new App(this.config, finalizer);
  this.app.start();
};

/**
 * Restart testem appilcation
 * @return {[type]} [description]
 */
Testem.prototype.restart = function() {
  this.app.triggerRun('Api: restart');
};

module.exports = Testem;
