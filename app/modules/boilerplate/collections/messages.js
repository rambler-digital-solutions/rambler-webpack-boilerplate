'use strict';

// Depends
var Backbone = require('backbone');
var Model    = require('../models/message');

/**
 * Default Backbone model
 * @type {[type]}
 */
module.exports = Backbone.Collection.extend({
  url: '/app/data/example.json',
  model: Model
});
