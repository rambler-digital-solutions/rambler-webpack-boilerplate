'use strict';

// Depends
var _        = require('underscore');
var Backbone = require('backbone');

/**
 * Default Backbone model
 * @type {[type]}
 */
module.exports = Backbone.Model.extend({
  defaults: {
    message: 'Hello bud! ^^'
  }
});
